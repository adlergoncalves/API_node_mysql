// Importa Express
const express = require('express');
// Importa MYSQL
const mysql = require('../mysql').pool;
// Executa Roteador
const router = express.Router();

// Busca todos os dados do banco em JSON
router.get('/busca', (req,res) => {

    mysql.getConnection((error,conn) => {
        if(error) { return res.status(500).send({ error:error }) }
        conn.query(
            'SELECT * FROM produto',
        (error, result, fields) => {
            if(error) { return res.status(500).send({ error:error}) }
            return res.status(200).send({response: result})
        }
        )
    });
});

// Busca item especifico do banco e retorna JSON
router.get('/buscaid/:id', (req,res) => {
    mysql.getConnection((error,conn) => {
        if(error) { return res.status(500).send({ error:error }) }
        conn.query(
            'SELECT * FROM produto WHERE id = ?',
            [req.params.id],
        (error, result, fields) => {
            if(error) { return res.status(500).send({ error:error}) }
            return res.status(200).send({response: result})
        }
        )
    });
});



// Insere no Banco
router.post('/insere', (req,res) => {
    mysql.getConnection((error,conn) => {
        if(error) { return res.status(500).send({ error:error })}
        conn.query(
            'INSERT INTO produto (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error:error, response:null }); }
                res.status(200).send({
                    mensagem: 'Produto inserido com sucesso!',
                    id_produto: result.insertId
                })
            }
        )
    });

});

// Edita um registro no Banco
router.put('/edita', (req,res) => {
    mysql.getConnection((error,conn) => {
        if(error) { return res.status(500).send({ error:error })}
        conn.query(
            `UPDATE produto
                SET nome = ?,
                    preco = ?
                WHERE id = ?`,
            [
             req.body.nome, 
             req.body.preco, 
             req.body.id
            ],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error:error, response:null }); }
                res.status(200).send({
                    mensagem: 'Produto Atualizado com sucesso!',
                })
            }
        )
    });

});

// Deleta um registro especifico do banco
router.delete('/deleta', (req,res) => {
    mysql.getConnection((error,conn) => {
        if(error) { return res.status(500).send({ error:error })}
        conn.query(
            `DELETE FROM produto WHERE id = ?`,
            [req.body.id],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error:error, response:null }); }
                res.status(200).send({
                    mensagem: 'Produto Excluido com sucesso!',
                })
            }
        )
    });
});


// Exporta Roteador
module.exports = router;