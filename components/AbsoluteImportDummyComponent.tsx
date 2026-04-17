"use client";
import {  Icon, Button, Input, Text } from "@/components";
import { useChat } from "@/hooks";

const styles = {
  container: "rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100",
}

export function AbsoluteImportDummyComponent() {
  const chat = useChat({ topK: 10 });
  
  const onClick = async () => {
    console.log("Button clicked");
    await chat.sendMessage("Hello, world!");
  };
  const onInputChange = (value: string) => {
    console.log("input changed", value);
  };
  
  const placeholder = "Enter your name";
  const text = "Hello, world!";

  return (
    <div className={styles.container}>
      <span>
        Absolute import OK: 
        <code className="font-mono">{"@/components/AbsoluteImportDummy"}</code>
      </span>
      <Icon name="menu" />
      <Button onClick={onClick}>Click me</Button>
      <Input value="" onChange={onInputChange} placeholder={placeholder} />
      <Text>{text}</Text>
    </div>
  );
}
