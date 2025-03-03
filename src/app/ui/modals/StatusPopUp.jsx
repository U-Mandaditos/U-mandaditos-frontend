import { FlexContainer } from "../essentials/FlexBox";
import Modal from "./Modal";
import Paragraph from "../essentials/Paragraph";

export default function StatusPopUp({response, isOpen, onClose}){
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={response?.title}
        subtitle={response?.subtitle}
      >
        <FlexContainer alignitems="center">
          <img
            style={{ width: "15%", marginRight: "20px" }}
            src={
              response?.isSuccess
                ? "/img/success-image.png"
                : "/img/error-image.png"
            }
          />
          <Paragraph size="18px">{response?.message}</Paragraph>
        </FlexContainer>
      </Modal>
    );
}