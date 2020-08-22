import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/** Lib que serve para formatação de nome para um formato mais "legível" */
import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    /** Descomentamos a linha 'data'
     * O 'FormData' será necessário para podermos enviar o arquivo para o back-end */
    const data = new FormData();

    /** Se 'uploadedFiles.length' for igual a zero, ou seja, se não tiver arquivo uppado, então paramos a execução no 'return'  */
    if (!uploadedFiles.length) return;

    /** Criamos a variável 'file' que vai armazenar o arquivo uppado que, via de regra, vai ser o primeiro da posição */
    const file = uploadedFiles[0];

    /** Através do 'append', passamos o nome dela que vai ser 'file', e depois 'file.file', pois nossa 'file' vai ser um objeto 'file' e
     * por fim, passamos também o 'file.name'
     */
    data.append('file', file.file, file.name);

    try {
      /** Descomentamos o api.post que leva à rota de importação */
      await api.post('/transactions/import', data);

      history.push('/');
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    /** Aqui precisamos recuperar o arquivo que foi enviado pelo dropzone */
    /** Criamos a variável 'uploadFiles' que irá mapear os 'files' recebidos e para cada 'file' retornamos um objeto que vai conter
     * a 'file', o 'name' e o 'readablesize'
     */
    const uploadFiles = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }));
    /** Pegamos o 'uploadFiles' e passamos dentro de 'setUploadedFiles' */
    setUploadedFiles(uploadFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
