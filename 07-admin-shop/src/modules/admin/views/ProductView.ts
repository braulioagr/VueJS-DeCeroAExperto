import CustomInput from '@common/components/CustomInput.vue';
import CustomTextArea from '@common/components/CustomTextArea.vue';
import { createUpdateProductAction, getProductByIdAction } from '@products/actions';
import { Size } from '@products/interfaces';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter, type Router } from 'vue-router';
import { productValidationSchema } from '../interfaces/schemas';
import { useToast } from 'vue-toastification';

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router: Router = useRouter();
    const toast = useToast();
    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema: productValidationSchema,
    });

    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductByIdAction(props.productId),
      retry: false,
    });

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updateProduct,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    });

    const onSubmit = handleSubmit(async (values) => {
      const formProductValues = {
        ...values,
        images: [...values.images, ...imageFiles.value],
      };
      mutate(formProductValues);
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');
    const { fields: images } = useFieldArray<string>('images');
    const imageFiles = ref<File[]>([]);

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const hasSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      return currentSizes.includes(size);
    };

    const onFileChange = (event: Event) => {
      const fileInput = event.target as HTMLInputElement;
      const filesList = fileInput.files;
      if (!filesList || !filesList.length) {
        return;
      }
      for (const file of filesList) {
        imageFiles.value.push(file);
      }
    };

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace({ name: 'admin-products' });
        return;
      }
    });

    watch(
      product,
      () => {
        if (!product) return;
        resetForm({
          values: product.value,
        });
      },
      {
        deep: true,
        immediate: true,
      },
    );

    watch(isUpdateSuccess, (value: boolean) => {
      if (!value) return;
      toast.success('Se ha actualizado el producto');
      router.replace(`/admin/products/${props.productId}`);
      resetForm({
        values: updateProduct.value,
      });
    });

    watch(
      () => props.productId,
      () => {
        refetch();
      },
    );

    return {
      //Properties
      values,
      errors,
      meta,
      isPending,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,

      sizes,
      images,
      imageFiles,
      //Getters
      allSizes: Object.values(Size),
      //Actions
      onSubmit,
      onFileChange,
      toggleSize,
      hasSize,
      temporalImageUrl: (imageFile: File) => {
        return URL.createObjectURL(imageFile);
      },
    };
  },
});
