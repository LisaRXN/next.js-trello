import { checkSubscription } from "@/lib/subscription";
import { Info } from "../_components/info";
import { SubscriptionButton } from "./_components/subscription-button";
import { Separator } from "@/components/ui/separator";

const BillingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro}></Info>
      <Separator className="my-2" />
      <SubscriptionButton isPro={isPro}></SubscriptionButton>
    </div>
  );
};

export default BillingPage;
