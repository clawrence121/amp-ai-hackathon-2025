"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

function AmpLogo() {
  return (
    <svg
      width="54"
      height="11"
      viewBox="0 0 54 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.8 0L0 11H1.8L3.75 8.25H7.8V11H10.9256L13.8 6.94639V0H9.6H7.8ZM7.8 6.6H4.92L7.8 2.53846V6.6ZM13.8 8.46154L19.8 0H21.6H25.8V8.46154L31.8 0H33.6H37.8V11H31.8V2.53846L25.8 11H24H19.8V2.53846L13.8 11H13.799H12H11.999L13.8 8.46019V8.46154ZM45 0H39V8.25V11H45V8.25H50.4C52.3882 8.25 54 6.77254 54 4.95V3.3C54 1.47746 52.3882 0 50.4 0H45ZM45 6.6H48.6V1.65L45 6.6Z"
        fill="#00FF95"
      />
    </svg>
  );
}

function AmpLogoGray() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="11"
      viewBox="0 0 52 11"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.51111 0L0 11H1.73333L3.61111 8.25H7.51111V11H10.521L13.2889 6.94639V0H9.24444H7.51111ZM7.51111 6.6H4.73778L7.51111 2.53846V6.6ZM13.2889 8.46154L19.0667 0H20.8H24.8444V8.46154L30.6222 0H32.3556H36.4V11H30.6222V2.53846L24.8444 11H23.1111H19.0667V2.53846L13.2889 11H13.288H11.5556H11.5546L13.2889 8.46019V8.46154ZM43.3333 0H37.5556V8.25V11H43.3333V8.25H48.5333C50.4479 8.25 52 6.77254 52 4.95V3.3C52 1.47746 50.4479 0 48.5333 0H43.3333ZM43.3333 6.6H46.8V1.65L43.3333 6.6Z"
        fill="#24232C"
      />
    </svg>
  );
}

interface AppSwitcherProps {
  open?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function AppSwitcher(props: AppSwitcherProps) {
  return (
    <div
      className={cn(
        props.open ? "bg-[hsl(var(--amp-lime-100))]" : "bg-[hsl(var(--upsell-gray-950))]",
        !props.disabled && "bg-[hsl(var(--upsell-gray-950))]",
        "flex flex-col justify-between transition-all ease-in",
      )}
    >
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        className={cn(
          props.open ? "bg-[hsl(var(--amp-lime-100))]" : "bg-[hsl(var(--upsell-gray-950))]",
          !props.disabled && "bg-[hsl(var(--upsell-gray-950))]",
          "delay-80 z-10 flex h-[46px] min-h-[46px] items-center justify-between gap-2.5 px-6 transition-all ease-in",
        )}
      >
        {props.open && props.disabled ? <AmpLogoGray /> : <AmpLogo />}
        {!props.disabled && (
          <>
            {props.open ? (
              <ChevronUp size={16} className="text-[hsl(var(--amp-lime-100))]" />
            ) : (
              <ChevronDown className="text-[hsl(var(--amp-lime-100))]" size={16} />
            )}
          </>
        )}
      </button>
      {!props.disabled && (
        <>
          <div
            className={cn(
              "absolute bottom-0 left-0 top-[46px] z-0 w-[255px] bg-[hsl(var(--upsell-gray-950))] transition-all",
              props.open ? "bottom-0 translate-y-0" : "translate-y-[-100%]",
            )}
          >
            {props.children}
          </div>

          <div
            onClick={props.onClick}
            className={cn(
              "invisible absolute bottom-0 left-[255px] right-0 top-0 z-0 z-10 bg-[hsl(var(--amp-gray-50))] opacity-0 transition-all",
              props.open && "visible opacity-90",
            )}
          ></div>
        </>
      )}
    </div>
  );
}