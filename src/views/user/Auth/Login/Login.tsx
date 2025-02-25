import { useEffect, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5'

import routes from '@/configs/routes'

import { Input } from '@/components/ui/input'
import { backendUrl } from '@/configs/baseUrl'
import { Button } from '@/components/ui/button'
import { LoginFormFields, loginSchema } from '@/validations'
import { useLogin } from '@/app/hooks/accounts'

const Login = () => {
    const navigate = useNavigate()

    const {
        register,
        setError,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<LoginFormFields>({ resolver: zodResolver(loginSchema) })

    const { mutateAsync } = useLogin()

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        try {
            await mutateAsync(data)
        } catch (error: any) {
            if (error.data && error.data.errors) {
                error.data.errors.forEach((errorItem: any) => {
                    Object.entries(errorItem).forEach(([key, value]) => {
                        const message = value as string
                        setError(key as keyof LoginFormFields, {
                            type: key,
                            message: message
                        })
                    })
                })
            }
        }
    }

    const handleGoogleLogin = () => {
        const popup = window.open(`${backendUrl}auth/google`, '_blank', 'width=800,height=600,top=100,left=100')

        if (popup) {
            popup.document.body.style.display = 'none'
        }
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        const user = localStorage.getItem('user_data')

        if (accessToken && user) {
            navigate(routes.userDashboard)
        }
    }, [navigate])

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="mx-auto w-full max-w-[450px] rounded-xl border p-4 shadow md:p-6 lg:p-10">
                <div className="flex flex-col items-center justify-center gap-3.5 md:gap-4 lg:gap-5">
                    <div className="flex w-full flex-col items-start gap-1">
                        <h1 className="text-2xl font-semibold text-foreground">Đăng nhập tài khoản</h1>
                        <p className="text-back text-sm">Sử dụng email hoặc dịch vụ khác để đăng nhập</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex w-full flex-col items-center justify-center gap-4"
                    >
                        <div className="w-full">
                            <Input
                                {...register('email')}
                                type="email"
                                placeholder="Email"
                                name="email"
                                id="email"
                                className="w-full"
                                disabled={isSubmitting}
                                autoFocus
                            />
                            {errors.email && <div className="text-sm text-secondaryRed">{errors.email.message}</div>}
                        </div>
                        <div className="relative w-full">
                            <Input
                                {...register('password')}
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Mật khẩu"
                                className="w-full"
                                disabled={isSubmitting}
                                autoComplete="current-password"
                            />
                            {errors.password && (
                                <div className="text-sm text-secondaryRed">{errors.password.message}</div>
                            )}
                            {showPassword ? (
                                <IoEyeOffSharp
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1 translate-y-1/2 transform cursor-pointer text-gray-500"
                                />
                            ) : (
                                <IoEyeSharp
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1 translate-y-1/2 transform cursor-pointer text-gray-500"
                                />
                            )}
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-1">
                                <Input
                                    type="checkbox"
                                    className="size-3.5 rounded-lg border-gray-300 bg-gray-100 focus:ring-1 focus:ring-blue-500"
                                    id="agree"
                                />
                                <label htmlFor="agree" className="cursor-pointer text-sm font-medium text-black/80">
                                    Ghi nhớ tài khoản
                                </label>
                            </div>
                            <div>
                                <Link to={routes.forgotPassword} className="font-medium">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>
                        <Button disabled={isSubmitting} variant="default" size="lg" className="w-full text-base">
                            Đăng nhập
                        </Button>
                    </form>

                    <hr className="my-2 w-full" />

                    <div className="w-full">
                        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-5">
                            <Button
                                onClick={handleGoogleLogin}
                                disabled={isSubmitting}
                                variant="outline"
                                size="lg"
                                className="flex flex-1 gap-2 p-2"
                            >
                                <FcGoogle className="size-5" />
                                <span className="text-base font-medium lg:text-sm">Google</span>
                            </Button>
                        </div>
                        <div className="mt-5 text-center">
                            <p className="text-gray-500">
                                Bạn chưa có tài khoản?{' '}
                                <Link to={routes.register} className="text-primary">
                                    Đăng ký
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
