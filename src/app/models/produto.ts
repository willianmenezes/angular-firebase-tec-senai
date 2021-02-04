import { stringify } from "@angular/compiler/src/util";
import { Categoria } from "./categoria";
import { Fornecedor } from "./fornecedor";

export interface Produto {
    id: string;
    nome: string;
    status: boolean;
    quantidadeEstoque: number;
    categoria: Categoria;
    fornecedor: Fornecedor;
}