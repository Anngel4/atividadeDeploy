import { connection } from "../configs/Database.js";

const produtoRepository = {

    criar: async (produto) => {
        const conn = await connection.getConnection();
        try {
            await conn.beginTransaction();
            const sql = `INSERT INTO produtos (id_categoria, nome, descricao, preco, caminho_imagem, quantidade_estoque) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [produto.idCategoria, produto.nome, produto.descricao, produto.preco, produto.caminho_imagem, produto.quantidade_estoque];

            const [rows] = await conn.execute(sql, values);
            await conn.commit();
            return rows;
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editar: async (produto) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sql = `
                UPDATE produtos 
                SET id_categoria = ?, nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?
                WHERE id_produto = ?
            `;

            const values = [
                produto.idCategoria,
                produto.nome,
                produto.descricao,
                produto.preco,
                produto.quantidade_estoque,
                produto.id
            ];

            const [result] = await conn.execute(sql, values);

            await conn.commit();

            return result;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            const sql = `DELETE FROM produtos WHERE id_produto = ?`;

            const [result] = await conn.execute(sql, [id]);

            await conn.commit();

            return result;

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionar: async () => {
        const conn = await connection.getConnection();

        try {
            const sql = `
                SELECT * 
                FROM produtos 
                ORDER BY quantidade_estoque DESC
            `;

            const [rows] = await conn.execute(sql);

            return rows;

        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionarValor: async (produtoId) => {
        const conn = await connection.getConnection();

        try {
            const sql = `SELECT preco FROM produtos WHERE id_produto = ?`;

            const [rows] = await conn.execute(sql, [produtoId]);

            return rows;

        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },

    selecionarUm: async (id) => {
        const conn = await connection.getConnection();

        try {
            const sql = `SELECT * FROM produtos WHERE id_produto = ?`;

            const [rows] = await conn.execute(sql, [id]);

            return rows;

        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }
};

export default produtoRepository;