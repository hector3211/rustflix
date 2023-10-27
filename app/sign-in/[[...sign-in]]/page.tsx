import { SignIn } from "@clerk/nextjs";

export default function Page({
  searchParams,
}: {
  searchParams: {
    redirectUrl?: string;
  };
}) {
  const { redirectUrl } = searchParams || {};
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex justify-center">
          <SignIn redirectUrl={redirectUrl} />
        </div>
      </div>
    </section>
  );
}
