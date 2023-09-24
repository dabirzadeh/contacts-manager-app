import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
    fullName: Yup.string().required("نام و نام خانوادگی الزامی می باشد."),
    profilePhoto: Yup.string().url("آدرس تصویر معتبر نیست!").required("تصویر مخاطب الزامی می باشد."),
    mobileNumber: Yup.number().required("شماره موبایل الزامی می باشد."),
    emailAddress: Yup.string().email("آدرس ایمیل معتبر نیست!").required("آدرس ایمیل الزامی می باشد."),
    job: Yup.string().nullable(),
    group: Yup.string().required("انتخاب گروه الزامی می باشد.")
});