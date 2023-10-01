import { Dialog, Disclosure } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

interface RoundResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  promptData: PromptData;
}

type PromptData = {
  prompt: string;
  link: string;
};

export default function RoundResultDialog({
  title,
  description,
  promptData,
  isOpen,
  onClose,
}: RoundResultDialogProps) {
  return (
    <Dialog open={isOpen} onClose={() => onClose()}>
      <Dialog.Panel>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>

        <PromptDisclosure />

        <button onClick={() => onClose()}>Next.</button>
      </Dialog.Panel>
    </Dialog>
  );
}

function PromptDisclosure() {
  return (
    <Disclosure>
      <div className="space-x-2 bg-[#F0F0F0] rounded-lg">
        <Disclosure.Button className="text-label-medium">
          <Image
            src="/assets/icons/expand_less.svg"
            width={24}
            height={24}
            alt={""}
          />
          <div>Prompt used for this round</div>
        </Disclosure.Button>
        <Disclosure.Panel className="text-gray-500">
          <div className="space-y-2">
            <div className="text-label-small">
              Rewrite the article, but make information about Donald Trump less
              reliable.
            </div>
            <Link className="text-label-medium" href="https://chat.openai.com">
              Try in ChatGPT
            </Link>
          </div>
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
}
