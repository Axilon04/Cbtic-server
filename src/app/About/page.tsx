import React from "react";

export default function About() {
  return (
    <div className="w-screen h-screen">
      <div className="relative w-full h-2/5 top-12">
        <img
          src="/images/fondo_unimeta.webp"
          alt=""
          className="w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
          Sobre Nosotros
        </h1>
      </div>
      <section
        id="about"
        className="pt-32 px-8 md:px-24 lg:px-40 z-0 2xl:px-96 text-gray-600 body-font relative mb-8 flex justify-
      center items-start flex-col gap-10"
      >
        <p className="text-justify">
          El Departamento de Ciencias Básicas de la Corporación Universitaria
          del Meta, forma parte de la Escuela de Ingeniería de esta Institución,
          y cumple funciones de docencia, investigación y proyección social en
          el campo de las ciencias naturales, las matemáticas, la química y la
          biología. Este departamento tiene como función sustantiva la formación
          integral de los futuros ingenieros, economistas y administradores de
          empresa que se forman en esta prestigiosa institución. Esto hace que
          el Departamento de Ciencias Básicas de UNIMETA, sea una parte
          fundamental de la formación de profesionales integrales, capaces de
          abarcar los problemas sociales, culturales y económicos de la región
          de la Orinoquia colombiana, desde una perspectiva cuantitativa,
          cualitativa y de cuidado del medio ambiente, de tal manera que los
          egresados de nuestra Institución Universitaria sean capaces de
          enfrentar los retos que la modernidad impone
        </p>
        <div className="w-full flex flex-row">
          <div className="bg-gray-800 w-2/4 h-[35rem]"></div>
          <div className="flex flex-col justify-center items-center w-2/4 gap-10 px-12">
            <div>
              <h1 className="font-bold text-center text-xl">Misión</h1>
              <p className="text-justify">
                Coadyuvar al desarrollo de planes, programas y proyectos de
                formación, investigación, extensión, proyección social e
                internacionalización en el campo de las ciencias básicas con
                criterios de pertinencia, calidad y excelencia con el fin de
                promover el avance científico y tecnológico de nuestra
                universidad, nuestra región y el país.
              </p>
            </div>
            <div>
              <h1 className="font-bold text-center text-xl">Visión</h1>
              <p className="text-justify">
                El departamento será líder en formación e investigación en el
                campo de Ciencias Básicas en la UNIMETA, promoviendo el interés
                y el acceso a las mismas, como base del desarrollo tecnológico y
                científico de nuestra universidad, nuestra región y el país.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
