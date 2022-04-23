import { Modal } from '@material-ui/core'
import {
    ContainerModalInfoReceitaOrDespesa,
    AlertCopyInfo,
    ContainerInfoReceitaOrDespesa,
    TitleInfoReceitaOrDespesa,
    InfoReceitaOrDespesa
} from './style'

export default function ModalReceitaOrDespesa({ open, onClose, copyTextInfo, copyInfo, receitaOrDespesa }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            {receitaOrDespesa && (
                <ContainerModalInfoReceitaOrDespesa receita={receitaOrDespesa.receita ? true : false}>
                    {copyTextInfo && (
                        <AlertCopyInfo>Texto copiado com sucesso!</AlertCopyInfo>
                    )}
                    <ContainerInfoReceitaOrDespesa>
                        <TitleInfoReceitaOrDespesa>Nome: </TitleInfoReceitaOrDespesa>
                        <InfoReceitaOrDespesa title="Copiar nome" onClick={copyInfo}>{receitaOrDespesa.nome}</InfoReceitaOrDespesa>
                    </ContainerInfoReceitaOrDespesa>
                    <ContainerInfoReceitaOrDespesa>
                        <TitleInfoReceitaOrDespesa>Valor: </TitleInfoReceitaOrDespesa>
                        <InfoReceitaOrDespesa title="Copiar valor" onClick={copyInfo}>{receitaOrDespesa.preco}</InfoReceitaOrDespesa>
                    </ContainerInfoReceitaOrDespesa>
                    <ContainerInfoReceitaOrDespesa>
                        <TitleInfoReceitaOrDespesa>Data: </TitleInfoReceitaOrDespesa>
                        <InfoReceitaOrDespesa title="Copiar data" onClick={copyInfo}>
                            {receitaOrDespesa.data || receitaOrDespesa.fixa && `${receitaOrDespesa.fixaDay}/${new Date().toLocaleDateString('pt-br').split('/')[1]}/${new Date().toLocaleDateString('pt-br').split('/')[2]}`}
                        </InfoReceitaOrDespesa>
                    </ContainerInfoReceitaOrDespesa>
                    <ContainerInfoReceitaOrDespesa>
                        <TitleInfoReceitaOrDespesa>Pago: </TitleInfoReceitaOrDespesa>
                        <InfoReceitaOrDespesa notCopy>
                            {receitaOrDespesa.pago ? 'Sim' : 'Não'}
                        </InfoReceitaOrDespesa>
                    </ContainerInfoReceitaOrDespesa>
                    {receitaOrDespesa.observação && (
                        <ContainerInfoReceitaOrDespesa>
                            <TitleInfoReceitaOrDespesa>Observação: </TitleInfoReceitaOrDespesa>
                            <InfoReceitaOrDespesa title="Copiar observação" onClick={copyInfo}>{receitaOrDespesa.observação}</InfoReceitaOrDespesa>
                        </ContainerInfoReceitaOrDespesa>
                    )}
                    <ContainerInfoReceitaOrDespesa>
                        <TitleInfoReceitaOrDespesa>Investimento: </TitleInfoReceitaOrDespesa>
                        <InfoReceitaOrDespesa notCopy>
                            {receitaOrDespesa.investimento ? 'Sim' : 'Não'}
                        </InfoReceitaOrDespesa>
                    </ContainerInfoReceitaOrDespesa>
                    <ContainerInfoReceitaOrDespesa>
                        <TitleInfoReceitaOrDespesa>Fixa: </TitleInfoReceitaOrDespesa>
                        <InfoReceitaOrDespesa notCopy>
                            {receitaOrDespesa.fixa ? 'Sim' : 'Não'}
                        </InfoReceitaOrDespesa>
                    </ContainerInfoReceitaOrDespesa>
                    <ContainerInfoReceitaOrDespesa>
                        <TitleInfoReceitaOrDespesa>Automático: </TitleInfoReceitaOrDespesa>
                        <InfoReceitaOrDespesa notCopy>
                            {receitaOrDespesa.auto ? 'Sim' : 'Não'}
                        </InfoReceitaOrDespesa>
                    </ContainerInfoReceitaOrDespesa>                                    
                </ContainerModalInfoReceitaOrDespesa>
            )}
        </Modal>
    )
}