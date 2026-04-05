import SnowbirdHeader from "@/components/snowbirdHeader";
import SnowbirdFooter from "@/components/snowbirdFooter";

export default function SnowbirdLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SnowbirdHeader />
      <div className="min-h-screen">{children}</div>
      <SnowbirdFooter />
    </>
  );
}
