import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState } from "../atoms";

interface INewCategoryForm {
  newCategory: string;
}
const Parent = styled.div`
  padding: 0 10px;
  height: 40px;
  width: 200px;
  border-radius: 10px;
  border: 2px solid purple;
  margin: 10px;
  display: flex;
  align-items: center;
`;

const Child = styled.div`
  width: 150px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Cor = styled(Child)`
  width: 50px;
`;

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<INewCategoryForm>();

  const setCusCategory = useSetRecoilState(categoriesState);
  const handleValid = ({ newCategory }: INewCategoryForm) => {
    setCusCategory((old) => [newCategory.toUpperCase(), ...old]);
    setValue("newCategory", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Parent>
        <Child>
          <input
            {...register("newCategory", {
              required: "enter new category plz",
              minLength: { value: 3, message: "longer plz" },
              maxLength: { value: 10, message: "shorter plz" },
            })}
            type="text"
            required
            placeholder="type new category"
          ></input>
        </Child>
        <Cor>
          <button>✅</button>
        </Cor>
      </Parent>

      <br />
      <span>{errors?.newCategory?.message}</span>
    </form>
  );
};
export default CreateCategory;
