import Image from "next/image";

export function MethodFeatureIcon() {
  return (
    <Image
      aria-hidden="true"
      data-component="method-feature-icon"
      src="/images/metodo/home_icon.png"
      alt=""
      width={170}
      height={170}
      priority
      sizes="170px"
      className="mx-auto size-[170px] shrink-0 object-contain"
    />
  );
}
