import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from } from "rxjs";
import { Categoria } from "../models/categoria";
import { Fornecedor } from "../models/fornecedor";
import { Produto } from "../models/produto";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    categorias: AngularFirestoreCollection<Categoria> = this.firestore.collection('Categorias');
    fornecedores: AngularFirestoreCollection<Fornecedor> = this.firestore.collection('Fornecedores');
    produtos: AngularFirestoreCollection<Produto> = this.firestore.collection('Produtos');

    constructor(
        private firestore: AngularFirestore
    ) { }

    buscarCategorias() {
        return this.categorias.valueChanges();
    }

    buscarFornecedores() {
        return this.fornecedores.valueChanges();
    }

    buscarProdutos() {
        return this.produtos.valueChanges();
    }

    cadastrarProduto(produto: Produto) {
        return from(this.produtos.doc(produto.id).set(produto));
    }

    excluirProduto(id: string) {
        return from(this.produtos.doc(id).delete());
    }

    editarProduto(produto: Produto) {
        return from(this.produtos.doc(produto.id).update(produto));
    }
}