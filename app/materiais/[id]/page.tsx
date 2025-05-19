import MateriaisClient from './MateriaisClient';

export default function Materiais({ params }: {params: { id: string } }) {
    return <MateriaisClient id={params.id} />
};
