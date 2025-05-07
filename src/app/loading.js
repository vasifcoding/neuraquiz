import {Loader} from "@/components/constants/loader";
export default function Loading() {
  return (
    <>
<div className="flex h-screen items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <Loader size="xl" />
</div>
    </>
  );
}