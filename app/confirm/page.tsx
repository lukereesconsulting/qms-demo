import ConfirmClient from "@/components/ConfirmClient";

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ via?: string }>;
}) {
  const { via } = await searchParams;
  return <ConfirmClient via={via === "upload" ? "upload" : "scan"} />;
}
