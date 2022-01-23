import { Modal } from '@material-ui/core'
import {
    Container,
    Title,
    ContainerInputMensalidade,
    IconInput,
    InputMensalidade,
    ContainerInputDescription,
    InputDescription,
    ButtonSubmit
} from './style'

export default function ModalMensalidade({ open, onClose, aluno, mesMensalidade }) {
    return (
      <Modal open={open} onClose={onClose}>
        <div>
          {aluno && (
              <Container>
                <Title>Mensalidade</Title>
                <ContainerInputMensalidade>
                    <IconInput xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="currentColor">
                        <g>
                            <rect fill="none" height="24" width="24"/>
                        </g>
                        <g>
                            <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8c0-4.41,3.59-8,8-8 s8,3.59,8,8C20,16.41,16.41,20,12,20z M12.89,11.1c-1.78-0.59-2.64-0.96-2.64-1.9c0-1.02,1.11-1.39,1.81-1.39 c1.31,0,1.79,0.99,1.9,1.34l1.58-0.67c-0.15-0.44-0.82-1.91-2.66-2.23V5h-1.75v1.26c-2.6,0.56-2.62,2.85-2.62,2.96 c0,2.27,2.25,2.91,3.35,3.31c1.58,0.56,2.28,1.07,2.28,2.03c0,1.13-1.05,1.61-1.98,1.61c-1.82,0-2.34-1.87-2.4-2.09L8.1,14.75 c0.63,2.19,2.28,2.78,3.02,2.96V19h1.75v-1.24c0.52-0.09,3.02-0.59,3.02-3.22C15.9,13.15,15.29,11.93,12.89,11.1z"/>
                        </g>
                    </IconInput>
                    <InputMensalidade type="text" defaultValue={aluno.pagamentos[mesMensalidade].value}/>
                </ContainerInputMensalidade>
                <ContainerInputDescription>
                    <IconInput xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 0h24v24H0V0z" fill="none"/>
                        <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
                    </IconInput>
                    <InputDescription rows="1" placeholder="Descrição" defaultValue={aluno.pagamentos[mesMensalidade].descrição}/>
                </ContainerInputDescription>
                <ButtonSubmit onClick={() => console.log('clicou')}>Salvar</ButtonSubmit>
              </Container>
          )}
        </div>
      </Modal>
    )
}