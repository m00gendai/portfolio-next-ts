import s from "@/styles/Kontakt.module.css"
import { SetStateAction } from "react";

interface isFormValue {
    name: string;
    mail: string;
    message: string;
  }
  interface isFocus {
    name: boolean;
    mail: boolean;
    message: boolean;
  }
  interface isFormValid {
    name: boolean;
    mail: boolean;
    message: boolean;
  }
interface inputProps {
  tag: string;
  type: string;
  content: string;
  pattern: undefined | string;
  formValue: isFormValue;
  focus: isFocus;
  formValid: isFormValid;
  setFormValue: React.Dispatch<SetStateAction<isFormValue>>;
  setFocus: React.Dispatch<SetStateAction<isFocus>>;
  setFormValid: React.Dispatch<SetStateAction<isFormValid>>;
}

export default function Input({
  tag,
  type,
  content,
  pattern,
  formValue,
  focus,
  formValid,
  setFormValue,
  setFocus,
  setFormValid,
}: inputProps) {
  return (
    <div className={s.containerInput}>
      <label
        className={
           s.labelActive
        }
        htmlFor={`${tag}`}
      >
        {content}
      </label>
      <input
        name={`${tag}`}
        type={`${type}`}
        placeholder=""
        required={content[content.length - 1] === '*' ? true : false}
        pattern={pattern === undefined ? undefined : `${pattern}`}
  
        onBlur={(event) => {
          setFormValid({
            ...formValid,
            [event.currentTarget.name]: event.currentTarget.checkValidity(),
          });

        }}
        onChange={(event) =>
          setFormValue({ ...formValue, [tag]: event.currentTarget.value })
        }
        className={
          
            s.inputActive
            
        }
      />
    </div>
  );
}
