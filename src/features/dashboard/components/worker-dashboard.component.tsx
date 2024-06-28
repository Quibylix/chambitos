import { Chip } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function getWorkerData() {
  return {
    title: "Fontanero",
    location: "San Francisco, CA",
    experiencia: "3 años",
    education: "Ingeniería Civil",
    skills: ["Plomería", "Trabajo en equipo", "Ingeniería Civil"],
    applications: [
      {
        id: 1,
        title: "Fontanero",
        company: "Plomería Rápida",
        status: "Pendiente",
      },
      {
        id: 2,
        title: "Fontanero",
        company: "Plomería Lenta",
        status: "Rechazado",
      },
      {
        id: 3,
        title: "Fontanero",
        company: "Plomería Segura",
        status: "Aceptado",
      },
    ],
  };
}

export default async function WorkerDashboard() {
  const session = await getServerSession();

  if (!session) return null;
  if (!session.user) return null;

  const workerData = await getWorkerData();

  return (
    <div className="max-w-screen-lg m-auto p-4">
      <section>
        <h2 className="text-3xl font-bold text-center mt-4 mb-2">
          {session.user.name}
        </h2>
        <p className="text-center text-gray-500 text-sm mb-4">
          {workerData.title}
        </p>
        <Link
          className="block m-auto w-max text-center border-default-400 border-1 text-foreground hover:border-default-600 py-2 px-4 rounded-md mb-4"
          href="/edit-profile"
        >
          Editar Perfil
        </Link>
        <div className="border-default-200 border-1 p-4 rounded-md mb-4 flex gap-6 flex-col md:flex-row items-center justify-center">
          <div>
            <img
              className="w-32 h-32 rounded-full"
              src={session.user.image ?? "/user.png"}
              alt={session.user.name ?? "User"}
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-center mb-4">
              Información Personal
            </h3>
            <p className="text-center text-gray-600 mb-2">
              <span className="font-bold">Ubicación:</span>{" "}
              {workerData.location}
            </p>
            <p className="text-center text-gray-600 mb-2">
              <span className="font-bold">Experiencia:</span>{" "}
              {workerData.experiencia}
            </p>
            <p className="text-center text-gray-600 mb-2">
              <span className="font-bold">Educación:</span>{" "}
              {workerData.education}
            </p>
            <p className="text-center text-gray-600 mb-2 font-bold">
              Habilidades:
            </p>
            <ul className="text-center text-gray-600 mt-4 max-w-80 flex gap-x-1 gap-y-2 flex-wrap justify-center">
              {workerData.skills.map(skill => (
                <li key={skill}>
                  <Chip>{skill}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="border-default-200 border-1 p-4 rounded-md mb-4">
        <h2 className="text-2xl font-bold text-center mt-4 mb-2">
          Aplicaciones
        </h2>
        <ul className="flex flex-col">
          {workerData.applications.map(application => (
            <li key={application.id}>
              <Link
                href={`/jobs/${application.id}`}
                className="rounded-md flex gap-4 items-center hover:bg-default-100 p-4"
              >
                <span className="grow">
                  <h3 className="text-lg font-bold">{application.title}</h3>
                  <p className="text-gray-600">{application.company}</p>
                </span>
                <span>
                  <span className="text-gray-600 font-bold">
                    Estado:{" "}
                    <Chip
                      variant="bordered"
                      color={
                        application.status === "Pendiente"
                          ? "warning"
                          : application.status === "Rechazado"
                            ? "danger"
                            : "success"
                      }
                    >
                      {application.status}
                    </Chip>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
