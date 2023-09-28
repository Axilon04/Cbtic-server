import useFaradayLaw from '@store/faradaylaw';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { memo } from 'react';
import { Button } from '@/components/ui/button';

function PanelsFaradayLaw() {
  const {
    stop,
    frequency,
    area,
    femInd,
    stopInteraction,
    updateFrequency,
    updateArea,
  } = useFaradayLaw(state => state);

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
              En física electromagnética, la "frecuencia" se refiere a la
              cantidad de ciclos o repeticiones completas de una onda
              electromagnética en un período de tiempo específico. Es una
              propiedad fundamental de las ondas electromagnéticas y se mide en
              hertz (Hz). Un hertz representa un ciclo por segundo.
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
          <AccordionTrigger>Area - valor actual: {area}</AccordionTrigger>
          <AccordionContent>
            <Label>Ques es Area?</Label>
            <p>
              el "área" se refiere a la superficie efectiva expuesta al flujo
              magnético, y la variación de este "área" al variar el ángulo es lo
              que afecta la cantidad de flujo magnético que pasa a través de
              ella. Este concepto es fundamental en la Ley de Faraday de la
              Inducción Electromagnética, que establece que una variación en el
              flujo magnético a través de una superficie cerrada induce una
              corriente eléctrica en un circuito.
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
          <AccordionTrigger>
            fem inducida - valor actual {femInd}{' '}
          </AccordionTrigger>
          <AccordionContent>aun nose que es</AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        onClick={stopInteraction}
        className={`w-full h-9 font-medium ${
          stop ? 'bg-green-400 text-black' : 'bg-red-400'
        }`}
      >
        {stop ? 'Reanudar interaccion' : 'detener interaccion'}
      </Button>
    </section>
  );
}

export default memo(PanelsFaradayLaw);
