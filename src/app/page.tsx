export default function Home() {
  
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center gap-16 pt-12">
    <div className="w-[80%] max-w-[705px] h-[300px] max-h-[300px] bg-[rgb(227,6,20)] bg-[linear-gradient(-45deg,#e30614_0%,#e30614_50%,#fdb201_50%,#fdb201_100%)] bg-no-repeat bg-[-30px_0px] bg-[length:110%] rounded-[10px] shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] flex justify-between items-center">
      <img
        src="logos/Logo_Cbtic.png"
        alt="Logo Cbtic"
        className="w-[40%] relative left-[10px] bottom-4"
      />
      <img
        src="logos/Logo_Unimeta.png"
        alt="Logo Unimeta"
        className="w-[45%] relative top-[60px] right-5"
      />
    </div>
  </section>
  )
}
