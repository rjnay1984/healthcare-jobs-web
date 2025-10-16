import { Container } from "@/components/ui/container";
import { serverApi } from "@/lib/api-server";

export default async function MePage() {
  const response = await serverApi.getCurrentUser();
  return (
    <Container className="py-10">
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </Container>
  );
}
