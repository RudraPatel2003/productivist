export default function Footer() {
  return (
    <footer className="w-full h-8 py-4 bg-pink text-dark-maroon text-xs flex justify-center items-center">
      <p>
        <a
          href="https://www.figma.com/file/CpwFJ8KpbCVHNBCBylETCt/productivist?node-id=0%3A1"
          target="_blank"
          rel="noreferrer"
          className="underline">
          Designed
        </a>
        {" "}and{" "}
        <a
          href="https://github.com/RudraPatel2003/productivist"
          target="_blank"
          rel="noreferrer"
          className="underline">
          Created
        </a>
        {" "}by Rudra Patel
      </p>
    </footer>
  );
}
