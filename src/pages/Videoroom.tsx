import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Videoroom = () => {
  const { roomID } = useParams();
  const meetingContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initMeeting = async () => {
      const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
      const serverSecret = import.meta.env.VITE_ZEGO_SERVER_KEY; // ⚠️ put in backend later
      const userID = Date.now().toString();

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID || "defaultRoom",
        userID,
        "Anish"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: meetingContainer.current!,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `${window.location.origin}/room/${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall, 
        },
        showScreenSharingButton: true,
      });
    };

    if (meetingContainer.current) {
      initMeeting();
    }
  }, [roomID]);

  return (
    <div className='relative w-screen h-screen'>
      <div ref={meetingContainer} className='w-full h-full' />

      <Button
        variant='destructive'
        size='sm'
        className='absolute top-4 right-4 z-50'
        onClick={() => {
          navigate("/patient");
          window.location.reload();
        }}
      >
        Close
      </Button>
    </div>
  );
};

export default Videoroom;