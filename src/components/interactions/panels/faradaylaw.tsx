import useFaradayLaw from "@store/faradaylaw";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { memo } from "react";
import { Button } from "@/components/ui/button";

function PanelsFaradayLaw() {
  const {
    stop,
    frequency,
    area,
    femInd,
    stopInteraction,
    updateFrequency,
    updateArea,
  } = useFaradayLaw((state) => state);

  function handleFrequency(checked: number[]) {
    updateFrequency(checked[0]);
  }

  function handleArea(checked: number[]) {
    updateArea(checked[0]);
  }

  return (
    <section className="w-80 h-2/3 absolute left-[82px] top-1/2 bg-white -translate-y-1/2 p-3 rounded-md shadow-md flex flex-col justify-between">
      <Accordion
        type="single"
        collapsible
        className="w-full h-5/6 overflow-y-auto pr-2 scroll-smooth"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Frecuencia - valor actual: {frequency}Hz
          </AccordionTrigger>
          <AccordionContent>
            <Label>Ques es la Frecuencia?</Label>
            <p>
              Se denomina frecuencia, al parámetro que mide La cantidad de
              vueltas que un elemento cualquiera realiza en un segundo. La
              unidad de frecuencia es el Hertz (Hz) En nuestra interacción la
              frecuencia es la cantidad de vueltas que la espira realiza en un
              segundo.
            </p>
            <Slider
              className="mt-5"
              defaultValue={[frequency]}
              max={1}
              step={0.1}
              onValueCommit={handleFrequency}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Area - valor actual: {area} cm²</AccordionTrigger>
          <AccordionContent>
            <Label>Ques es Area?</Label>
            <p>
              En este caso se toma el área como la superficie plana delimitada
              por la espira y se denota con la letra S.
            </p>
            <Slider
              className="mt-5"
              defaultValue={[area]}
              max={10}
              step={1}
              onValueCommit={handleArea}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <h3 className="p-1 text-lg">
          Fem Inducida - valor actual {femInd}
          </h3>
        </AccordionItem>
      </Accordion>
      <Button
        onClick={stopInteraction}
        className={`w-full h-9 font-medium ${
          !stop ? "bg-green-400 text-black" : "bg-red-400"
        }`}
      >
        {!stop ? "Reanudar interaccion" : "detener interaccion"}
      </Button>
    </section>
  );
}

export default memo(PanelsFaradayLaw);
