import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from '../models/categoria';
import { Fornecedor } from '../models/fornecedor';
import * as alertify from 'alertifyjs';
import { v4 as uuid } from 'uuid';

import { Produto } from '../models/produto';
import { ProdutoService } from './produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  formCadastrar: FormGroup;

  icons = {
    faPlus
  }

  categorias: Categoria[];
  fornecedores: Fornecedor[];
  produtos: Produto[];

  fornecedorCadastro: Fornecedor;
  categoriaCadastro: Categoria;

  constructor(
    private produtoService: ProdutoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buscarCategorias();
    this.buscarFornecedores();
    this.buscarProdutos();

    this.formCadastrar = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      status: ['', [Validators.required]],
      quantidadeEstoque: ['', [Validators.required, Validators.min(1), Validators.max(50)]],
      categoria: ['', [Validators.required]],
      fornecedor: ['', [Validators.required]]
    });
  }

  buscarCategorias() {
    this.produtoService
      .buscarCategorias()
      .subscribe((categorias) => {
        this.categorias = categorias;
      })
  }

  buscarProdutos() {
    this.produtoService
      .buscarProdutos()
      .subscribe((response) => {
        this.produtos = response;
      })
  }

  buscarFornecedores() {
    this.produtoService
      .buscarFornecedores()
      .subscribe((fornecedores) => {
        this.fornecedores = fornecedores;
      })
  }

  selecionarCategoria(id: string) {
    this.categoriaCadastro = this.categorias.find((item) => item.id === id);
  }

  selecionarFornecedor(id: string) {
    this.fornecedorCadastro = this.fornecedores.find((item) => item.id === id);
  }

  cadastrar() {

    if (this.formCadastrar.valid) {

      let produto: Produto = this.formCadastrar.getRawValue();
      produto.status = this.formCadastrar.get('status').value === 'true' ? true : false;
      produto.categoria = this.categoriaCadastro;
      produto.fornecedor = this.fornecedorCadastro;
      produto.id = uuid();

      this.produtoService
        .cadastrarProduto(produto)
        .subscribe((response) => {
          alertify.success('Produto cadastrado com  sucesso');
          this.formCadastrar.reset();
        });
    }
  }

  excluir(id: string) {
    this.produtoService
      .excluirProduto(id)
      .subscribe(() => {
        alertify.success('Produto removido com sucesso');
      })
  }
}
