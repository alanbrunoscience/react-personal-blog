import Postagem from "./Postagem";

export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    postagens?: Postagem | null; // "?": indica que o preenchimento dos dados deste atributo é opcional.
}
