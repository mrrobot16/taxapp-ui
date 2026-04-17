import { AbsoluteImportDummyDiv, AbsoluteImportDummyButton } from "@/components";

const styles = {
  container: "flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black",
  main: "flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start",
}

export default async function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AbsoluteImportDummyDiv />
        <AbsoluteImportDummyButton text="Click me" />
      </main>
    </div>
  );
}
