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
interface textareaProps {
  tag: string;
  content: string;
  formValue: isFormValue;
  focus: isFocus;
  setFocus: React.Dispatch<SetStateAction<isFocus>>;
  setFormValue: React.Dispatch<SetStateAction<isFormValue>>;
}

export default function Text({
  tag,
  content,
  formValue,
  focus,
  setFormValue,
  setFocus,
}: textareaProps) {
  return (
    <div className={s.containerTextarea}>
      <label
        className={
         
             s.labelActive
        }
        htmlFor={`${tag}`}
      >
        {content}
      </label>
      <textarea
        name={`${tag}`}
        placeholder=""
        required
     
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
