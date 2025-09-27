"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Modal from "@/components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";
import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AUTO_LOGOUT_TIME = 10 * 60 * 1000;
const COUNTDOWN_TIME = 60;

export default function AutoLogoutWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading=false } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_TIME);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logoutCalledRef = useRef(false);

  const handleLogout = useCallback(async () => {
    if (logoutCalledRef.current) return; // prevent multiple calls
    logoutCalledRef.current = true;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);

    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logged out successfully");
        router.push("/signin");
      })
      .finally(() => {
        logoutCalledRef.current = false;
      });
  }, [dispatch, router]);

  const resetIdleTimer = useCallback(() => {
    if (showModal) return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setShowModal(true), AUTO_LOGOUT_TIME);
  }, [showModal]);

  const stayLoggedIn = () => {
    setShowModal(false);
    setCountdown(COUNTDOWN_TIME);
    if (countdownRef.current) clearInterval(countdownRef.current);
    resetIdleTimer();
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetIdleTimer));
    resetIdleTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdleTimer));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [resetIdleTimer]);

  useEffect(() => {
    if (showModal) {
      setCountdown(COUNTDOWN_TIME);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current!);
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownRef.current) clearInterval(countdownRef.current);
    }

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [showModal, handleLogout]);

  return (
    <>
      {children}

      <Modal
        title="You will be logged out soon"
        message={`You will be logged out in ${countdown} seconds due to inactivity.`}
        isOpen={showModal}
        onClose={() => {}}
        actions={[
          { label: "Stay Login", onClick: stayLoggedIn, variant: "primary", loading: loading },
          { label: "Logout", onClick: handleLogout, variant: "danger", loading: loading },
        ]}
      />
    </>
  );
}
