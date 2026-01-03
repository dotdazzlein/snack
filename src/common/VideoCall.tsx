"use client";

import React, { useEffect, useRef, useState } from "react";
// import SteamLoading from "./Loading/SteamLoading";
import { HiOutlineArrowRight } from "react-icons/hi";
import { socket } from "../lib/soket";
import { useUser } from "../context/UserContext";
import ScrollGrid from "../components/UI/ScrollGrid";
import StreamLoading from "../components/Loading/StreamLoading";

const VideoCall = () => {
  const { user } = useUser();
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [partner, setPartner] = useState<{ name?: string; image?: string; } | null>(null);

  const localStreamRef = useRef<MediaStream | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const partnerIdRef = useRef<string | null>(null);

  const [searching, setSearching] = useState(false);
  const [connected, setConnected] = useState(false);


  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    })();
  }, []);

  const createPeer = () => {
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
      ],
    });

    // Send your camera to the other user
    localStreamRef.current?.getTracks().forEach((track) => {
      peerRef.current?.addTrack(track, localStreamRef.current!);
    });

    // Receive other user's video
    peerRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Send network info via socket
    peerRef.current.onicecandidate = (event) => {
      if (event.candidate && partnerIdRef.current) {
        socket.emit("signal", {
          to: partnerIdRef.current,
          data: event.candidate,
        });
      }
    };
  };


  const handelStart = async () => {
    socket.connect();
    setSearching(true);

    socket.emit("start-search");

    socket.on("matched", async ({ partnerId, role, partner }) => {
      console.log(partner);
      
      setConnected(true)
      console.log("partner id:", partnerId);
setPartner(partner);
      partnerIdRef.current = partnerId;
      createPeer();

      // ONLY caller creates offer
      if (role === "caller") {
        const offer = await peerRef.current!.createOffer();
        await peerRef.current!.setLocalDescription(offer);

        socket.emit("signal", {
          to: partnerId,
          data: offer,
        });
      }
    });

    socket.on("signal", async ({ from, data }) => {
      if (!peerRef.current) createPeer();

      // If you receive an offer
      if (data.type === "offer") {
        partnerIdRef.current = from;

        await peerRef.current!.setRemoteDescription(data);

        const answer = await peerRef.current!.createAnswer();
        await peerRef.current!.setLocalDescription(answer);

        socket.emit("signal", {
          to: from,
          data: answer,
        });
      }

      // If you receive an answer
      if (data.type === "answer") {
        await peerRef.current!.setRemoteDescription(data);
      }

      // ICE candidates
      if (data.candidate) {
        await peerRef.current!.addIceCandidate(data);
      }
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-3 h-full">
        {/* LOCAL */}
        <div className="w-1/2 rounded-xl overflow-hidden relative">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {!searching && !connected && (
            <button
              onClick={handelStart}
              className="absolute bottom-6 right-6 bg-white px-5 py-3 rounded-3xl font-bold"
            >
              Start Video Chat
            </button>
          )}
        </div>


        <div className="w-1/2 relative rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center">
          { <StreamLoading />}
          {/* <ScrollGrid /> */}
          {/* {connected && (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          )} */}

          <div className="absolute bottom-6 left-0 px-6 flex items-center justify-between w-full">
            <h1 className="text-3xl text-white font-bold">Azar</h1>
            <div className="flex items-center gap-2 text-white">
                <img src={partner?.image} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <h1 className="font-semibold text-">{partner?.name}</h1>
                  <div className="flex items-center gap-0.5">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLZSoO1zUogOB233_S_6YL-eVPYaQXnRR5GA&s" alt="" className="w-3.5" />
                    <h1 className="text-xs font-bold">IN</h1>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {connected && (
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <button className="bg-black text-white p-3 rounded-xl cursor-pointer">esc</button>
          <div className="text-sm">
            <h1 className="font-semibold">End Video Chat</h1>
            <p>Press esc key to end video chat</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <div className="text-sm">
            <h1 className="font-semibold">Next Video Chat</h1>
            <p>Press right key to meet others</p>
          </div>
          <button className="bg-black text-white p-3 rounded-xl text-xl cursor-pointer">
            <HiOutlineArrowRight />
          </button>
        </div>
      </div>
       )} 
    </div>
  );
};

export default VideoCall;