declare namespace WechatMiniprogram.Page {
  type Options<
    TData extends DataOption,
    TCustom extends CustomOption
  > = (TCustom &
    Partial<Data<TData>> & {
      rules?: {
        [key: string]: {
          required?: boolean
          message: string
          pattern?: string | RegExp
        }[]
      }
    } & Partial<ILifetime> & {
      options?: Component.ComponentOptions
    }) &
    ThisType<
      Instance<
        TData,
        TCustom & {
          validate(): boolean
          validate(key: string): {
            valid: boolean
            dataKey: string
            message: string
          }
        }
      >
    >
}

declare namespace WechatMiniprogram.Component {
  type Options<
    TData extends DataOption,
    TProperty extends PropertyOption,
    TMethod extends MethodOption,
    TCustomInstanceProperty extends IAnyObject = {},
    TIsPage extends boolean = false
  > = Partial<Data<TData>> &
    Partial<Property<TProperty>> &
    Partial<Method<TMethod, TIsPage>> &
    Partial<OtherOption> &
    Partial<Lifetimes> &
    ThisType<
      Instance<
        TData,
        TProperty,
        TMethod & {
          validate(): boolean
          validate(key: string): {
            valid: boolean
            dataKey: string
            message: string
          }
        },
        TCustomInstanceProperty,
        TIsPage
      >
    > & {
      rules?: {
        [key: string]: {
          required?: boolean
          message: string
          pattern?: string | RegExp
        }[]
      }
    }
}

declare namespace WechatMiniprogram.Behavior {
  type Options<
    TData extends DataOption,
    TProperty extends PropertyOption,
    TMethod extends MethodOption,
    TCustomInstanceProperty extends IAnyObject = Record<string, never>
  > = Partial<Data<TData>> &
    Partial<Property<TProperty>> &
    Partial<Method<TMethod>> &
    Partial<OtherOption> &
    Partial<Lifetimes> &
    ThisType<
      Instance<
        TData,
        TProperty,
        TMethod,
        TCustomInstanceProperty & {
          rules?: {
            [key: string]: {
              required?: boolean
              message: string
              pattern?: string | RegExp
            }[]
          }
        }
      >
    >
}
