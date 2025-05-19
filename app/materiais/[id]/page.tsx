import MateriaisClient from './MateriaisClient';

export default async function Materiais({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return (
        <>
            <MateriaisClient id={resolvedParams.id} />
        </>
    );
}
