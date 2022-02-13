import { LabelInputStyle, LabelInputStyleReq } from './style'

export default function LabelInput({ children, required }) {
    if (required) {
      return (
        <>
          <LabelInputStyle>
            {children}
            <LabelInputStyleReq>*</LabelInputStyleReq>
          </LabelInputStyle>
        </>
      )
    } else {
      return <LabelInputStyle>{children}</LabelInputStyle>
    }
}