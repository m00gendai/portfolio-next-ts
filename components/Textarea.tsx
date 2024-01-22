import { isFocus, isFormValue } from "@/interfaces";
import s from "@/styles/contactForm.module.css"
import { SetStateAction } from "react";

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
      <label className={s.labelActive} htmlFor={`${tag}`}>
        {content}
      </label>
      <textarea
        name={`${tag}`}
        placeholder=""
        required
        onChange={(event) =>
          setFormValue({ ...formValue, [tag]: event.currentTarget.value })
        }
        className={s.inputActive}
      />
    </div>
  );
}
