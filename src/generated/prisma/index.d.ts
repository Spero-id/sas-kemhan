
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model auth_user
 * 
 */
export type auth_user = $Result.DefaultSelection<Prisma.$auth_userPayload>
/**
 * Model chat
 * 
 */
export type chat = $Result.DefaultSelection<Prisma.$chatPayload>
/**
 * Model cctv
 * 
 */
export type cctv = $Result.DefaultSelection<Prisma.$cctvPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  admin: 'admin',
  public: 'public'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Auth_users
 * const auth_users = await prisma.auth_user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Auth_users
   * const auth_users = await prisma.auth_user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.auth_user`: Exposes CRUD operations for the **auth_user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Auth_users
    * const auth_users = await prisma.auth_user.findMany()
    * ```
    */
  get auth_user(): Prisma.auth_userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chat`: Exposes CRUD operations for the **chat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chats
    * const chats = await prisma.chat.findMany()
    * ```
    */
  get chat(): Prisma.chatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cctv`: Exposes CRUD operations for the **cctv** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cctvs
    * const cctvs = await prisma.cctv.findMany()
    * ```
    */
  get cctv(): Prisma.cctvDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    auth_user: 'auth_user',
    chat: 'chat',
    cctv: 'cctv'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "auth_user" | "chat" | "cctv"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      auth_user: {
        payload: Prisma.$auth_userPayload<ExtArgs>
        fields: Prisma.auth_userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.auth_userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.auth_userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload>
          }
          findFirst: {
            args: Prisma.auth_userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.auth_userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload>
          }
          findMany: {
            args: Prisma.auth_userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload>[]
          }
          create: {
            args: Prisma.auth_userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload>
          }
          createMany: {
            args: Prisma.auth_userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.auth_userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload>[]
          }
          delete: {
            args: Prisma.auth_userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload>
          }
          update: {
            args: Prisma.auth_userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload>
          }
          deleteMany: {
            args: Prisma.auth_userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.auth_userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.auth_userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload>[]
          }
          upsert: {
            args: Prisma.auth_userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_userPayload>
          }
          aggregate: {
            args: Prisma.Auth_userAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuth_user>
          }
          groupBy: {
            args: Prisma.auth_userGroupByArgs<ExtArgs>
            result: $Utils.Optional<Auth_userGroupByOutputType>[]
          }
          count: {
            args: Prisma.auth_userCountArgs<ExtArgs>
            result: $Utils.Optional<Auth_userCountAggregateOutputType> | number
          }
        }
      }
      chat: {
        payload: Prisma.$chatPayload<ExtArgs>
        fields: Prisma.chatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.chatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.chatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          findFirst: {
            args: Prisma.chatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.chatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          findMany: {
            args: Prisma.chatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>[]
          }
          create: {
            args: Prisma.chatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          createMany: {
            args: Prisma.chatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.chatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>[]
          }
          delete: {
            args: Prisma.chatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          update: {
            args: Prisma.chatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          deleteMany: {
            args: Prisma.chatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.chatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.chatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>[]
          }
          upsert: {
            args: Prisma.chatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          aggregate: {
            args: Prisma.ChatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChat>
          }
          groupBy: {
            args: Prisma.chatGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatGroupByOutputType>[]
          }
          count: {
            args: Prisma.chatCountArgs<ExtArgs>
            result: $Utils.Optional<ChatCountAggregateOutputType> | number
          }
        }
      }
      cctv: {
        payload: Prisma.$cctvPayload<ExtArgs>
        fields: Prisma.cctvFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cctvFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cctvFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload>
          }
          findFirst: {
            args: Prisma.cctvFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cctvFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload>
          }
          findMany: {
            args: Prisma.cctvFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload>[]
          }
          create: {
            args: Prisma.cctvCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload>
          }
          createMany: {
            args: Prisma.cctvCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cctvCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload>[]
          }
          delete: {
            args: Prisma.cctvDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload>
          }
          update: {
            args: Prisma.cctvUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload>
          }
          deleteMany: {
            args: Prisma.cctvDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cctvUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cctvUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload>[]
          }
          upsert: {
            args: Prisma.cctvUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cctvPayload>
          }
          aggregate: {
            args: Prisma.CctvAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCctv>
          }
          groupBy: {
            args: Prisma.cctvGroupByArgs<ExtArgs>
            result: $Utils.Optional<CctvGroupByOutputType>[]
          }
          count: {
            args: Prisma.cctvCountArgs<ExtArgs>
            result: $Utils.Optional<CctvCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    auth_user?: auth_userOmit
    chat?: chatOmit
    cctv?: cctvOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Auth_userCountOutputType
   */

  export type Auth_userCountOutputType = {
    chats: number
  }

  export type Auth_userCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | Auth_userCountOutputTypeCountChatsArgs
  }

  // Custom InputTypes
  /**
   * Auth_userCountOutputType without action
   */
  export type Auth_userCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth_userCountOutputType
     */
    select?: Auth_userCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Auth_userCountOutputType without action
   */
  export type Auth_userCountOutputTypeCountChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chatWhereInput
  }


  /**
   * Models
   */

  /**
   * Model auth_user
   */

  export type AggregateAuth_user = {
    _count: Auth_userCountAggregateOutputType | null
    _avg: Auth_userAvgAggregateOutputType | null
    _sum: Auth_userSumAggregateOutputType | null
    _min: Auth_userMinAggregateOutputType | null
    _max: Auth_userMaxAggregateOutputType | null
  }

  export type Auth_userAvgAggregateOutputType = {
    id: number | null
  }

  export type Auth_userSumAggregateOutputType = {
    id: number | null
  }

  export type Auth_userMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    last_login: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Auth_userMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    last_login: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Auth_userCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    last_login: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Auth_userAvgAggregateInputType = {
    id?: true
  }

  export type Auth_userSumAggregateInputType = {
    id?: true
  }

  export type Auth_userMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    last_login?: true
    created_at?: true
    updated_at?: true
  }

  export type Auth_userMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    last_login?: true
    created_at?: true
    updated_at?: true
  }

  export type Auth_userCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    last_login?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Auth_userAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_user to aggregate.
     */
    where?: auth_userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_users to fetch.
     */
    orderBy?: auth_userOrderByWithRelationInput | auth_userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: auth_userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned auth_users
    **/
    _count?: true | Auth_userCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Auth_userAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Auth_userSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Auth_userMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Auth_userMaxAggregateInputType
  }

  export type GetAuth_userAggregateType<T extends Auth_userAggregateArgs> = {
        [P in keyof T & keyof AggregateAuth_user]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuth_user[P]>
      : GetScalarType<T[P], AggregateAuth_user[P]>
  }




  export type auth_userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: auth_userWhereInput
    orderBy?: auth_userOrderByWithAggregationInput | auth_userOrderByWithAggregationInput[]
    by: Auth_userScalarFieldEnum[] | Auth_userScalarFieldEnum
    having?: auth_userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Auth_userCountAggregateInputType | true
    _avg?: Auth_userAvgAggregateInputType
    _sum?: Auth_userSumAggregateInputType
    _min?: Auth_userMinAggregateInputType
    _max?: Auth_userMaxAggregateInputType
  }

  export type Auth_userGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    last_login: Date | null
    created_at: Date
    updated_at: Date
    _count: Auth_userCountAggregateOutputType | null
    _avg: Auth_userAvgAggregateOutputType | null
    _sum: Auth_userSumAggregateOutputType | null
    _min: Auth_userMinAggregateOutputType | null
    _max: Auth_userMaxAggregateOutputType | null
  }

  type GetAuth_userGroupByPayload<T extends auth_userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Auth_userGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Auth_userGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Auth_userGroupByOutputType[P]>
            : GetScalarType<T[P], Auth_userGroupByOutputType[P]>
        }
      >
    >


  export type auth_userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
    chats?: boolean | auth_user$chatsArgs<ExtArgs>
    _count?: boolean | Auth_userCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auth_user"]>

  export type auth_userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["auth_user"]>

  export type auth_userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["auth_user"]>

  export type auth_userSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type auth_userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "last_login" | "created_at" | "updated_at", ExtArgs["result"]["auth_user"]>
  export type auth_userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | auth_user$chatsArgs<ExtArgs>
    _count?: boolean | Auth_userCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type auth_userIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type auth_userIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $auth_userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "auth_user"
    objects: {
      chats: Prisma.$chatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      role: $Enums.Role
      last_login: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["auth_user"]>
    composites: {}
  }

  type auth_userGetPayload<S extends boolean | null | undefined | auth_userDefaultArgs> = $Result.GetResult<Prisma.$auth_userPayload, S>

  type auth_userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<auth_userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Auth_userCountAggregateInputType | true
    }

  export interface auth_userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['auth_user'], meta: { name: 'auth_user' } }
    /**
     * Find zero or one Auth_user that matches the filter.
     * @param {auth_userFindUniqueArgs} args - Arguments to find a Auth_user
     * @example
     * // Get one Auth_user
     * const auth_user = await prisma.auth_user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends auth_userFindUniqueArgs>(args: SelectSubset<T, auth_userFindUniqueArgs<ExtArgs>>): Prisma__auth_userClient<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Auth_user that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {auth_userFindUniqueOrThrowArgs} args - Arguments to find a Auth_user
     * @example
     * // Get one Auth_user
     * const auth_user = await prisma.auth_user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends auth_userFindUniqueOrThrowArgs>(args: SelectSubset<T, auth_userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__auth_userClient<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_user that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_userFindFirstArgs} args - Arguments to find a Auth_user
     * @example
     * // Get one Auth_user
     * const auth_user = await prisma.auth_user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends auth_userFindFirstArgs>(args?: SelectSubset<T, auth_userFindFirstArgs<ExtArgs>>): Prisma__auth_userClient<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_user that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_userFindFirstOrThrowArgs} args - Arguments to find a Auth_user
     * @example
     * // Get one Auth_user
     * const auth_user = await prisma.auth_user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends auth_userFindFirstOrThrowArgs>(args?: SelectSubset<T, auth_userFindFirstOrThrowArgs<ExtArgs>>): Prisma__auth_userClient<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Auth_users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Auth_users
     * const auth_users = await prisma.auth_user.findMany()
     * 
     * // Get first 10 Auth_users
     * const auth_users = await prisma.auth_user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auth_userWithIdOnly = await prisma.auth_user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends auth_userFindManyArgs>(args?: SelectSubset<T, auth_userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Auth_user.
     * @param {auth_userCreateArgs} args - Arguments to create a Auth_user.
     * @example
     * // Create one Auth_user
     * const Auth_user = await prisma.auth_user.create({
     *   data: {
     *     // ... data to create a Auth_user
     *   }
     * })
     * 
     */
    create<T extends auth_userCreateArgs>(args: SelectSubset<T, auth_userCreateArgs<ExtArgs>>): Prisma__auth_userClient<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Auth_users.
     * @param {auth_userCreateManyArgs} args - Arguments to create many Auth_users.
     * @example
     * // Create many Auth_users
     * const auth_user = await prisma.auth_user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends auth_userCreateManyArgs>(args?: SelectSubset<T, auth_userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Auth_users and returns the data saved in the database.
     * @param {auth_userCreateManyAndReturnArgs} args - Arguments to create many Auth_users.
     * @example
     * // Create many Auth_users
     * const auth_user = await prisma.auth_user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Auth_users and only return the `id`
     * const auth_userWithIdOnly = await prisma.auth_user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends auth_userCreateManyAndReturnArgs>(args?: SelectSubset<T, auth_userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Auth_user.
     * @param {auth_userDeleteArgs} args - Arguments to delete one Auth_user.
     * @example
     * // Delete one Auth_user
     * const Auth_user = await prisma.auth_user.delete({
     *   where: {
     *     // ... filter to delete one Auth_user
     *   }
     * })
     * 
     */
    delete<T extends auth_userDeleteArgs>(args: SelectSubset<T, auth_userDeleteArgs<ExtArgs>>): Prisma__auth_userClient<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Auth_user.
     * @param {auth_userUpdateArgs} args - Arguments to update one Auth_user.
     * @example
     * // Update one Auth_user
     * const auth_user = await prisma.auth_user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends auth_userUpdateArgs>(args: SelectSubset<T, auth_userUpdateArgs<ExtArgs>>): Prisma__auth_userClient<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Auth_users.
     * @param {auth_userDeleteManyArgs} args - Arguments to filter Auth_users to delete.
     * @example
     * // Delete a few Auth_users
     * const { count } = await prisma.auth_user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends auth_userDeleteManyArgs>(args?: SelectSubset<T, auth_userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auth_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Auth_users
     * const auth_user = await prisma.auth_user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends auth_userUpdateManyArgs>(args: SelectSubset<T, auth_userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auth_users and returns the data updated in the database.
     * @param {auth_userUpdateManyAndReturnArgs} args - Arguments to update many Auth_users.
     * @example
     * // Update many Auth_users
     * const auth_user = await prisma.auth_user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Auth_users and only return the `id`
     * const auth_userWithIdOnly = await prisma.auth_user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends auth_userUpdateManyAndReturnArgs>(args: SelectSubset<T, auth_userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Auth_user.
     * @param {auth_userUpsertArgs} args - Arguments to update or create a Auth_user.
     * @example
     * // Update or create a Auth_user
     * const auth_user = await prisma.auth_user.upsert({
     *   create: {
     *     // ... data to create a Auth_user
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Auth_user we want to update
     *   }
     * })
     */
    upsert<T extends auth_userUpsertArgs>(args: SelectSubset<T, auth_userUpsertArgs<ExtArgs>>): Prisma__auth_userClient<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Auth_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_userCountArgs} args - Arguments to filter Auth_users to count.
     * @example
     * // Count the number of Auth_users
     * const count = await prisma.auth_user.count({
     *   where: {
     *     // ... the filter for the Auth_users we want to count
     *   }
     * })
    **/
    count<T extends auth_userCountArgs>(
      args?: Subset<T, auth_userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Auth_userCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Auth_user.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Auth_userAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Auth_userAggregateArgs>(args: Subset<T, Auth_userAggregateArgs>): Prisma.PrismaPromise<GetAuth_userAggregateType<T>>

    /**
     * Group by Auth_user.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends auth_userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: auth_userGroupByArgs['orderBy'] }
        : { orderBy?: auth_userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, auth_userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuth_userGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the auth_user model
   */
  readonly fields: auth_userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for auth_user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__auth_userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chats<T extends auth_user$chatsArgs<ExtArgs> = {}>(args?: Subset<T, auth_user$chatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the auth_user model
   */
  interface auth_userFieldRefs {
    readonly id: FieldRef<"auth_user", 'Int'>
    readonly name: FieldRef<"auth_user", 'String'>
    readonly email: FieldRef<"auth_user", 'String'>
    readonly password: FieldRef<"auth_user", 'String'>
    readonly role: FieldRef<"auth_user", 'Role'>
    readonly last_login: FieldRef<"auth_user", 'DateTime'>
    readonly created_at: FieldRef<"auth_user", 'DateTime'>
    readonly updated_at: FieldRef<"auth_user", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * auth_user findUnique
   */
  export type auth_userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
    /**
     * Filter, which auth_user to fetch.
     */
    where: auth_userWhereUniqueInput
  }

  /**
   * auth_user findUniqueOrThrow
   */
  export type auth_userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
    /**
     * Filter, which auth_user to fetch.
     */
    where: auth_userWhereUniqueInput
  }

  /**
   * auth_user findFirst
   */
  export type auth_userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
    /**
     * Filter, which auth_user to fetch.
     */
    where?: auth_userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_users to fetch.
     */
    orderBy?: auth_userOrderByWithRelationInput | auth_userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_users.
     */
    cursor?: auth_userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_users.
     */
    distinct?: Auth_userScalarFieldEnum | Auth_userScalarFieldEnum[]
  }

  /**
   * auth_user findFirstOrThrow
   */
  export type auth_userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
    /**
     * Filter, which auth_user to fetch.
     */
    where?: auth_userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_users to fetch.
     */
    orderBy?: auth_userOrderByWithRelationInput | auth_userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_users.
     */
    cursor?: auth_userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_users.
     */
    distinct?: Auth_userScalarFieldEnum | Auth_userScalarFieldEnum[]
  }

  /**
   * auth_user findMany
   */
  export type auth_userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
    /**
     * Filter, which auth_users to fetch.
     */
    where?: auth_userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_users to fetch.
     */
    orderBy?: auth_userOrderByWithRelationInput | auth_userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing auth_users.
     */
    cursor?: auth_userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_users.
     */
    skip?: number
    distinct?: Auth_userScalarFieldEnum | Auth_userScalarFieldEnum[]
  }

  /**
   * auth_user create
   */
  export type auth_userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
    /**
     * The data needed to create a auth_user.
     */
    data: XOR<auth_userCreateInput, auth_userUncheckedCreateInput>
  }

  /**
   * auth_user createMany
   */
  export type auth_userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many auth_users.
     */
    data: auth_userCreateManyInput | auth_userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * auth_user createManyAndReturn
   */
  export type auth_userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * The data used to create many auth_users.
     */
    data: auth_userCreateManyInput | auth_userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * auth_user update
   */
  export type auth_userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
    /**
     * The data needed to update a auth_user.
     */
    data: XOR<auth_userUpdateInput, auth_userUncheckedUpdateInput>
    /**
     * Choose, which auth_user to update.
     */
    where: auth_userWhereUniqueInput
  }

  /**
   * auth_user updateMany
   */
  export type auth_userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update auth_users.
     */
    data: XOR<auth_userUpdateManyMutationInput, auth_userUncheckedUpdateManyInput>
    /**
     * Filter which auth_users to update
     */
    where?: auth_userWhereInput
    /**
     * Limit how many auth_users to update.
     */
    limit?: number
  }

  /**
   * auth_user updateManyAndReturn
   */
  export type auth_userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * The data used to update auth_users.
     */
    data: XOR<auth_userUpdateManyMutationInput, auth_userUncheckedUpdateManyInput>
    /**
     * Filter which auth_users to update
     */
    where?: auth_userWhereInput
    /**
     * Limit how many auth_users to update.
     */
    limit?: number
  }

  /**
   * auth_user upsert
   */
  export type auth_userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
    /**
     * The filter to search for the auth_user to update in case it exists.
     */
    where: auth_userWhereUniqueInput
    /**
     * In case the auth_user found by the `where` argument doesn't exist, create a new auth_user with this data.
     */
    create: XOR<auth_userCreateInput, auth_userUncheckedCreateInput>
    /**
     * In case the auth_user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<auth_userUpdateInput, auth_userUncheckedUpdateInput>
  }

  /**
   * auth_user delete
   */
  export type auth_userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
    /**
     * Filter which auth_user to delete.
     */
    where: auth_userWhereUniqueInput
  }

  /**
   * auth_user deleteMany
   */
  export type auth_userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_users to delete
     */
    where?: auth_userWhereInput
    /**
     * Limit how many auth_users to delete.
     */
    limit?: number
  }

  /**
   * auth_user.chats
   */
  export type auth_user$chatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    where?: chatWhereInput
    orderBy?: chatOrderByWithRelationInput | chatOrderByWithRelationInput[]
    cursor?: chatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * auth_user without action
   */
  export type auth_userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_user
     */
    select?: auth_userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_user
     */
    omit?: auth_userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_userInclude<ExtArgs> | null
  }


  /**
   * Model chat
   */

  export type AggregateChat = {
    _count: ChatCountAggregateOutputType | null
    _avg: ChatAvgAggregateOutputType | null
    _sum: ChatSumAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  export type ChatAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type ChatSumAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type ChatMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    content: string | null
    created_at: Date | null
  }

  export type ChatMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    content: string | null
    created_at: Date | null
  }

  export type ChatCountAggregateOutputType = {
    id: number
    user_id: number
    content: number
    created_at: number
    _all: number
  }


  export type ChatAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type ChatSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type ChatMinAggregateInputType = {
    id?: true
    user_id?: true
    content?: true
    created_at?: true
  }

  export type ChatMaxAggregateInputType = {
    id?: true
    user_id?: true
    content?: true
    created_at?: true
  }

  export type ChatCountAggregateInputType = {
    id?: true
    user_id?: true
    content?: true
    created_at?: true
    _all?: true
  }

  export type ChatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chat to aggregate.
     */
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatOrderByWithRelationInput | chatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chats
    **/
    _count?: true | ChatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMaxAggregateInputType
  }

  export type GetChatAggregateType<T extends ChatAggregateArgs> = {
        [P in keyof T & keyof AggregateChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChat[P]>
      : GetScalarType<T[P], AggregateChat[P]>
  }




  export type chatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chatWhereInput
    orderBy?: chatOrderByWithAggregationInput | chatOrderByWithAggregationInput[]
    by: ChatScalarFieldEnum[] | ChatScalarFieldEnum
    having?: chatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatCountAggregateInputType | true
    _avg?: ChatAvgAggregateInputType
    _sum?: ChatSumAggregateInputType
    _min?: ChatMinAggregateInputType
    _max?: ChatMaxAggregateInputType
  }

  export type ChatGroupByOutputType = {
    id: number
    user_id: number
    content: string
    created_at: Date
    _count: ChatCountAggregateOutputType | null
    _avg: ChatAvgAggregateOutputType | null
    _sum: ChatSumAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  type GetChatGroupByPayload<T extends chatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatGroupByOutputType[P]>
            : GetScalarType<T[P], ChatGroupByOutputType[P]>
        }
      >
    >


  export type chatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    content?: boolean
    created_at?: boolean
    user?: boolean | auth_userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type chatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    content?: boolean
    created_at?: boolean
    user?: boolean | auth_userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type chatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    content?: boolean
    created_at?: boolean
    user?: boolean | auth_userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type chatSelectScalar = {
    id?: boolean
    user_id?: boolean
    content?: boolean
    created_at?: boolean
  }

  export type chatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "content" | "created_at", ExtArgs["result"]["chat"]>
  export type chatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | auth_userDefaultArgs<ExtArgs>
  }
  export type chatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | auth_userDefaultArgs<ExtArgs>
  }
  export type chatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | auth_userDefaultArgs<ExtArgs>
  }

  export type $chatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "chat"
    objects: {
      user: Prisma.$auth_userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      content: string
      created_at: Date
    }, ExtArgs["result"]["chat"]>
    composites: {}
  }

  type chatGetPayload<S extends boolean | null | undefined | chatDefaultArgs> = $Result.GetResult<Prisma.$chatPayload, S>

  type chatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<chatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatCountAggregateInputType | true
    }

  export interface chatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['chat'], meta: { name: 'chat' } }
    /**
     * Find zero or one Chat that matches the filter.
     * @param {chatFindUniqueArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends chatFindUniqueArgs>(args: SelectSubset<T, chatFindUniqueArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {chatFindUniqueOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends chatFindUniqueOrThrowArgs>(args: SelectSubset<T, chatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatFindFirstArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends chatFindFirstArgs>(args?: SelectSubset<T, chatFindFirstArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatFindFirstOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends chatFindFirstOrThrowArgs>(args?: SelectSubset<T, chatFindFirstOrThrowArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chats
     * const chats = await prisma.chat.findMany()
     * 
     * // Get first 10 Chats
     * const chats = await prisma.chat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatWithIdOnly = await prisma.chat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends chatFindManyArgs>(args?: SelectSubset<T, chatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chat.
     * @param {chatCreateArgs} args - Arguments to create a Chat.
     * @example
     * // Create one Chat
     * const Chat = await prisma.chat.create({
     *   data: {
     *     // ... data to create a Chat
     *   }
     * })
     * 
     */
    create<T extends chatCreateArgs>(args: SelectSubset<T, chatCreateArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chats.
     * @param {chatCreateManyArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends chatCreateManyArgs>(args?: SelectSubset<T, chatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chats and returns the data saved in the database.
     * @param {chatCreateManyAndReturnArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends chatCreateManyAndReturnArgs>(args?: SelectSubset<T, chatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chat.
     * @param {chatDeleteArgs} args - Arguments to delete one Chat.
     * @example
     * // Delete one Chat
     * const Chat = await prisma.chat.delete({
     *   where: {
     *     // ... filter to delete one Chat
     *   }
     * })
     * 
     */
    delete<T extends chatDeleteArgs>(args: SelectSubset<T, chatDeleteArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chat.
     * @param {chatUpdateArgs} args - Arguments to update one Chat.
     * @example
     * // Update one Chat
     * const chat = await prisma.chat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends chatUpdateArgs>(args: SelectSubset<T, chatUpdateArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chats.
     * @param {chatDeleteManyArgs} args - Arguments to filter Chats to delete.
     * @example
     * // Delete a few Chats
     * const { count } = await prisma.chat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends chatDeleteManyArgs>(args?: SelectSubset<T, chatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends chatUpdateManyArgs>(args: SelectSubset<T, chatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats and returns the data updated in the database.
     * @param {chatUpdateManyAndReturnArgs} args - Arguments to update many Chats.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends chatUpdateManyAndReturnArgs>(args: SelectSubset<T, chatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chat.
     * @param {chatUpsertArgs} args - Arguments to update or create a Chat.
     * @example
     * // Update or create a Chat
     * const chat = await prisma.chat.upsert({
     *   create: {
     *     // ... data to create a Chat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chat we want to update
     *   }
     * })
     */
    upsert<T extends chatUpsertArgs>(args: SelectSubset<T, chatUpsertArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatCountArgs} args - Arguments to filter Chats to count.
     * @example
     * // Count the number of Chats
     * const count = await prisma.chat.count({
     *   where: {
     *     // ... the filter for the Chats we want to count
     *   }
     * })
    **/
    count<T extends chatCountArgs>(
      args?: Subset<T, chatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatAggregateArgs>(args: Subset<T, ChatAggregateArgs>): Prisma.PrismaPromise<GetChatAggregateType<T>>

    /**
     * Group by Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends chatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: chatGroupByArgs['orderBy'] }
        : { orderBy?: chatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, chatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the chat model
   */
  readonly fields: chatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for chat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__chatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends auth_userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, auth_userDefaultArgs<ExtArgs>>): Prisma__auth_userClient<$Result.GetResult<Prisma.$auth_userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the chat model
   */
  interface chatFieldRefs {
    readonly id: FieldRef<"chat", 'Int'>
    readonly user_id: FieldRef<"chat", 'Int'>
    readonly content: FieldRef<"chat", 'String'>
    readonly created_at: FieldRef<"chat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * chat findUnique
   */
  export type chatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chat to fetch.
     */
    where: chatWhereUniqueInput
  }

  /**
   * chat findUniqueOrThrow
   */
  export type chatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chat to fetch.
     */
    where: chatWhereUniqueInput
  }

  /**
   * chat findFirst
   */
  export type chatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chat to fetch.
     */
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatOrderByWithRelationInput | chatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chats.
     */
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * chat findFirstOrThrow
   */
  export type chatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chat to fetch.
     */
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatOrderByWithRelationInput | chatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chats.
     */
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * chat findMany
   */
  export type chatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chats to fetch.
     */
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatOrderByWithRelationInput | chatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chats.
     */
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * chat create
   */
  export type chatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * The data needed to create a chat.
     */
    data: XOR<chatCreateInput, chatUncheckedCreateInput>
  }

  /**
   * chat createMany
   */
  export type chatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chats.
     */
    data: chatCreateManyInput | chatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * chat createManyAndReturn
   */
  export type chatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * The data used to create many chats.
     */
    data: chatCreateManyInput | chatCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * chat update
   */
  export type chatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * The data needed to update a chat.
     */
    data: XOR<chatUpdateInput, chatUncheckedUpdateInput>
    /**
     * Choose, which chat to update.
     */
    where: chatWhereUniqueInput
  }

  /**
   * chat updateMany
   */
  export type chatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chats.
     */
    data: XOR<chatUpdateManyMutationInput, chatUncheckedUpdateManyInput>
    /**
     * Filter which chats to update
     */
    where?: chatWhereInput
    /**
     * Limit how many chats to update.
     */
    limit?: number
  }

  /**
   * chat updateManyAndReturn
   */
  export type chatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * The data used to update chats.
     */
    data: XOR<chatUpdateManyMutationInput, chatUncheckedUpdateManyInput>
    /**
     * Filter which chats to update
     */
    where?: chatWhereInput
    /**
     * Limit how many chats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * chat upsert
   */
  export type chatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * The filter to search for the chat to update in case it exists.
     */
    where: chatWhereUniqueInput
    /**
     * In case the chat found by the `where` argument doesn't exist, create a new chat with this data.
     */
    create: XOR<chatCreateInput, chatUncheckedCreateInput>
    /**
     * In case the chat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chatUpdateInput, chatUncheckedUpdateInput>
  }

  /**
   * chat delete
   */
  export type chatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter which chat to delete.
     */
    where: chatWhereUniqueInput
  }

  /**
   * chat deleteMany
   */
  export type chatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chats to delete
     */
    where?: chatWhereInput
    /**
     * Limit how many chats to delete.
     */
    limit?: number
  }

  /**
   * chat without action
   */
  export type chatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
  }


  /**
   * Model cctv
   */

  export type AggregateCctv = {
    _count: CctvCountAggregateOutputType | null
    _avg: CctvAvgAggregateOutputType | null
    _sum: CctvSumAggregateOutputType | null
    _min: CctvMinAggregateOutputType | null
    _max: CctvMaxAggregateOutputType | null
  }

  export type CctvAvgAggregateOutputType = {
    id: number | null
  }

  export type CctvSumAggregateOutputType = {
    id: number | null
  }

  export type CctvMinAggregateOutputType = {
    id: number | null
    nama: string | null
    path_slug: string | null
    rtsp_url: string | null
    status: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CctvMaxAggregateOutputType = {
    id: number | null
    nama: string | null
    path_slug: string | null
    rtsp_url: string | null
    status: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CctvCountAggregateOutputType = {
    id: number
    nama: number
    path_slug: number
    rtsp_url: number
    status: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CctvAvgAggregateInputType = {
    id?: true
  }

  export type CctvSumAggregateInputType = {
    id?: true
  }

  export type CctvMinAggregateInputType = {
    id?: true
    nama?: true
    path_slug?: true
    rtsp_url?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type CctvMaxAggregateInputType = {
    id?: true
    nama?: true
    path_slug?: true
    rtsp_url?: true
    status?: true
    created_at?: true
    updated_at?: true
  }

  export type CctvCountAggregateInputType = {
    id?: true
    nama?: true
    path_slug?: true
    rtsp_url?: true
    status?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CctvAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cctv to aggregate.
     */
    where?: cctvWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cctvs to fetch.
     */
    orderBy?: cctvOrderByWithRelationInput | cctvOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cctvWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cctvs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cctvs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cctvs
    **/
    _count?: true | CctvCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CctvAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CctvSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CctvMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CctvMaxAggregateInputType
  }

  export type GetCctvAggregateType<T extends CctvAggregateArgs> = {
        [P in keyof T & keyof AggregateCctv]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCctv[P]>
      : GetScalarType<T[P], AggregateCctv[P]>
  }




  export type cctvGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cctvWhereInput
    orderBy?: cctvOrderByWithAggregationInput | cctvOrderByWithAggregationInput[]
    by: CctvScalarFieldEnum[] | CctvScalarFieldEnum
    having?: cctvScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CctvCountAggregateInputType | true
    _avg?: CctvAvgAggregateInputType
    _sum?: CctvSumAggregateInputType
    _min?: CctvMinAggregateInputType
    _max?: CctvMaxAggregateInputType
  }

  export type CctvGroupByOutputType = {
    id: number
    nama: string
    path_slug: string
    rtsp_url: string
    status: boolean
    created_at: Date
    updated_at: Date
    _count: CctvCountAggregateOutputType | null
    _avg: CctvAvgAggregateOutputType | null
    _sum: CctvSumAggregateOutputType | null
    _min: CctvMinAggregateOutputType | null
    _max: CctvMaxAggregateOutputType | null
  }

  type GetCctvGroupByPayload<T extends cctvGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CctvGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CctvGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CctvGroupByOutputType[P]>
            : GetScalarType<T[P], CctvGroupByOutputType[P]>
        }
      >
    >


  export type cctvSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    path_slug?: boolean
    rtsp_url?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["cctv"]>

  export type cctvSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    path_slug?: boolean
    rtsp_url?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["cctv"]>

  export type cctvSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    path_slug?: boolean
    rtsp_url?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["cctv"]>

  export type cctvSelectScalar = {
    id?: boolean
    nama?: boolean
    path_slug?: boolean
    rtsp_url?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type cctvOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama" | "path_slug" | "rtsp_url" | "status" | "created_at" | "updated_at", ExtArgs["result"]["cctv"]>

  export type $cctvPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cctv"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nama: string
      path_slug: string
      rtsp_url: string
      status: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["cctv"]>
    composites: {}
  }

  type cctvGetPayload<S extends boolean | null | undefined | cctvDefaultArgs> = $Result.GetResult<Prisma.$cctvPayload, S>

  type cctvCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cctvFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CctvCountAggregateInputType | true
    }

  export interface cctvDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cctv'], meta: { name: 'cctv' } }
    /**
     * Find zero or one Cctv that matches the filter.
     * @param {cctvFindUniqueArgs} args - Arguments to find a Cctv
     * @example
     * // Get one Cctv
     * const cctv = await prisma.cctv.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cctvFindUniqueArgs>(args: SelectSubset<T, cctvFindUniqueArgs<ExtArgs>>): Prisma__cctvClient<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cctv that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cctvFindUniqueOrThrowArgs} args - Arguments to find a Cctv
     * @example
     * // Get one Cctv
     * const cctv = await prisma.cctv.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cctvFindUniqueOrThrowArgs>(args: SelectSubset<T, cctvFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cctvClient<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cctv that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cctvFindFirstArgs} args - Arguments to find a Cctv
     * @example
     * // Get one Cctv
     * const cctv = await prisma.cctv.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cctvFindFirstArgs>(args?: SelectSubset<T, cctvFindFirstArgs<ExtArgs>>): Prisma__cctvClient<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cctv that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cctvFindFirstOrThrowArgs} args - Arguments to find a Cctv
     * @example
     * // Get one Cctv
     * const cctv = await prisma.cctv.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cctvFindFirstOrThrowArgs>(args?: SelectSubset<T, cctvFindFirstOrThrowArgs<ExtArgs>>): Prisma__cctvClient<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cctvs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cctvFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cctvs
     * const cctvs = await prisma.cctv.findMany()
     * 
     * // Get first 10 Cctvs
     * const cctvs = await prisma.cctv.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cctvWithIdOnly = await prisma.cctv.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends cctvFindManyArgs>(args?: SelectSubset<T, cctvFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cctv.
     * @param {cctvCreateArgs} args - Arguments to create a Cctv.
     * @example
     * // Create one Cctv
     * const Cctv = await prisma.cctv.create({
     *   data: {
     *     // ... data to create a Cctv
     *   }
     * })
     * 
     */
    create<T extends cctvCreateArgs>(args: SelectSubset<T, cctvCreateArgs<ExtArgs>>): Prisma__cctvClient<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cctvs.
     * @param {cctvCreateManyArgs} args - Arguments to create many Cctvs.
     * @example
     * // Create many Cctvs
     * const cctv = await prisma.cctv.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cctvCreateManyArgs>(args?: SelectSubset<T, cctvCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cctvs and returns the data saved in the database.
     * @param {cctvCreateManyAndReturnArgs} args - Arguments to create many Cctvs.
     * @example
     * // Create many Cctvs
     * const cctv = await prisma.cctv.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cctvs and only return the `id`
     * const cctvWithIdOnly = await prisma.cctv.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cctvCreateManyAndReturnArgs>(args?: SelectSubset<T, cctvCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cctv.
     * @param {cctvDeleteArgs} args - Arguments to delete one Cctv.
     * @example
     * // Delete one Cctv
     * const Cctv = await prisma.cctv.delete({
     *   where: {
     *     // ... filter to delete one Cctv
     *   }
     * })
     * 
     */
    delete<T extends cctvDeleteArgs>(args: SelectSubset<T, cctvDeleteArgs<ExtArgs>>): Prisma__cctvClient<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cctv.
     * @param {cctvUpdateArgs} args - Arguments to update one Cctv.
     * @example
     * // Update one Cctv
     * const cctv = await prisma.cctv.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cctvUpdateArgs>(args: SelectSubset<T, cctvUpdateArgs<ExtArgs>>): Prisma__cctvClient<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cctvs.
     * @param {cctvDeleteManyArgs} args - Arguments to filter Cctvs to delete.
     * @example
     * // Delete a few Cctvs
     * const { count } = await prisma.cctv.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cctvDeleteManyArgs>(args?: SelectSubset<T, cctvDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cctvs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cctvUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cctvs
     * const cctv = await prisma.cctv.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cctvUpdateManyArgs>(args: SelectSubset<T, cctvUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cctvs and returns the data updated in the database.
     * @param {cctvUpdateManyAndReturnArgs} args - Arguments to update many Cctvs.
     * @example
     * // Update many Cctvs
     * const cctv = await prisma.cctv.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cctvs and only return the `id`
     * const cctvWithIdOnly = await prisma.cctv.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends cctvUpdateManyAndReturnArgs>(args: SelectSubset<T, cctvUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cctv.
     * @param {cctvUpsertArgs} args - Arguments to update or create a Cctv.
     * @example
     * // Update or create a Cctv
     * const cctv = await prisma.cctv.upsert({
     *   create: {
     *     // ... data to create a Cctv
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cctv we want to update
     *   }
     * })
     */
    upsert<T extends cctvUpsertArgs>(args: SelectSubset<T, cctvUpsertArgs<ExtArgs>>): Prisma__cctvClient<$Result.GetResult<Prisma.$cctvPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cctvs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cctvCountArgs} args - Arguments to filter Cctvs to count.
     * @example
     * // Count the number of Cctvs
     * const count = await prisma.cctv.count({
     *   where: {
     *     // ... the filter for the Cctvs we want to count
     *   }
     * })
    **/
    count<T extends cctvCountArgs>(
      args?: Subset<T, cctvCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CctvCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cctv.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CctvAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CctvAggregateArgs>(args: Subset<T, CctvAggregateArgs>): Prisma.PrismaPromise<GetCctvAggregateType<T>>

    /**
     * Group by Cctv.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cctvGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends cctvGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cctvGroupByArgs['orderBy'] }
        : { orderBy?: cctvGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, cctvGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCctvGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cctv model
   */
  readonly fields: cctvFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cctv.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cctvClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the cctv model
   */
  interface cctvFieldRefs {
    readonly id: FieldRef<"cctv", 'Int'>
    readonly nama: FieldRef<"cctv", 'String'>
    readonly path_slug: FieldRef<"cctv", 'String'>
    readonly rtsp_url: FieldRef<"cctv", 'String'>
    readonly status: FieldRef<"cctv", 'Boolean'>
    readonly created_at: FieldRef<"cctv", 'DateTime'>
    readonly updated_at: FieldRef<"cctv", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * cctv findUnique
   */
  export type cctvFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * Filter, which cctv to fetch.
     */
    where: cctvWhereUniqueInput
  }

  /**
   * cctv findUniqueOrThrow
   */
  export type cctvFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * Filter, which cctv to fetch.
     */
    where: cctvWhereUniqueInput
  }

  /**
   * cctv findFirst
   */
  export type cctvFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * Filter, which cctv to fetch.
     */
    where?: cctvWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cctvs to fetch.
     */
    orderBy?: cctvOrderByWithRelationInput | cctvOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cctvs.
     */
    cursor?: cctvWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cctvs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cctvs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cctvs.
     */
    distinct?: CctvScalarFieldEnum | CctvScalarFieldEnum[]
  }

  /**
   * cctv findFirstOrThrow
   */
  export type cctvFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * Filter, which cctv to fetch.
     */
    where?: cctvWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cctvs to fetch.
     */
    orderBy?: cctvOrderByWithRelationInput | cctvOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cctvs.
     */
    cursor?: cctvWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cctvs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cctvs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cctvs.
     */
    distinct?: CctvScalarFieldEnum | CctvScalarFieldEnum[]
  }

  /**
   * cctv findMany
   */
  export type cctvFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * Filter, which cctvs to fetch.
     */
    where?: cctvWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cctvs to fetch.
     */
    orderBy?: cctvOrderByWithRelationInput | cctvOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cctvs.
     */
    cursor?: cctvWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cctvs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cctvs.
     */
    skip?: number
    distinct?: CctvScalarFieldEnum | CctvScalarFieldEnum[]
  }

  /**
   * cctv create
   */
  export type cctvCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * The data needed to create a cctv.
     */
    data: XOR<cctvCreateInput, cctvUncheckedCreateInput>
  }

  /**
   * cctv createMany
   */
  export type cctvCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cctvs.
     */
    data: cctvCreateManyInput | cctvCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cctv createManyAndReturn
   */
  export type cctvCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * The data used to create many cctvs.
     */
    data: cctvCreateManyInput | cctvCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cctv update
   */
  export type cctvUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * The data needed to update a cctv.
     */
    data: XOR<cctvUpdateInput, cctvUncheckedUpdateInput>
    /**
     * Choose, which cctv to update.
     */
    where: cctvWhereUniqueInput
  }

  /**
   * cctv updateMany
   */
  export type cctvUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cctvs.
     */
    data: XOR<cctvUpdateManyMutationInput, cctvUncheckedUpdateManyInput>
    /**
     * Filter which cctvs to update
     */
    where?: cctvWhereInput
    /**
     * Limit how many cctvs to update.
     */
    limit?: number
  }

  /**
   * cctv updateManyAndReturn
   */
  export type cctvUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * The data used to update cctvs.
     */
    data: XOR<cctvUpdateManyMutationInput, cctvUncheckedUpdateManyInput>
    /**
     * Filter which cctvs to update
     */
    where?: cctvWhereInput
    /**
     * Limit how many cctvs to update.
     */
    limit?: number
  }

  /**
   * cctv upsert
   */
  export type cctvUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * The filter to search for the cctv to update in case it exists.
     */
    where: cctvWhereUniqueInput
    /**
     * In case the cctv found by the `where` argument doesn't exist, create a new cctv with this data.
     */
    create: XOR<cctvCreateInput, cctvUncheckedCreateInput>
    /**
     * In case the cctv was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cctvUpdateInput, cctvUncheckedUpdateInput>
  }

  /**
   * cctv delete
   */
  export type cctvDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
    /**
     * Filter which cctv to delete.
     */
    where: cctvWhereUniqueInput
  }

  /**
   * cctv deleteMany
   */
  export type cctvDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cctvs to delete
     */
    where?: cctvWhereInput
    /**
     * Limit how many cctvs to delete.
     */
    limit?: number
  }

  /**
   * cctv without action
   */
  export type cctvDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cctv
     */
    select?: cctvSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cctv
     */
    omit?: cctvOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Auth_userScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    last_login: 'last_login',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Auth_userScalarFieldEnum = (typeof Auth_userScalarFieldEnum)[keyof typeof Auth_userScalarFieldEnum]


  export const ChatScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    content: 'content',
    created_at: 'created_at'
  };

  export type ChatScalarFieldEnum = (typeof ChatScalarFieldEnum)[keyof typeof ChatScalarFieldEnum]


  export const CctvScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    path_slug: 'path_slug',
    rtsp_url: 'rtsp_url',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CctvScalarFieldEnum = (typeof CctvScalarFieldEnum)[keyof typeof CctvScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type auth_userWhereInput = {
    AND?: auth_userWhereInput | auth_userWhereInput[]
    OR?: auth_userWhereInput[]
    NOT?: auth_userWhereInput | auth_userWhereInput[]
    id?: IntFilter<"auth_user"> | number
    name?: StringFilter<"auth_user"> | string
    email?: StringFilter<"auth_user"> | string
    password?: StringFilter<"auth_user"> | string
    role?: EnumRoleFilter<"auth_user"> | $Enums.Role
    last_login?: DateTimeNullableFilter<"auth_user"> | Date | string | null
    created_at?: DateTimeFilter<"auth_user"> | Date | string
    updated_at?: DateTimeFilter<"auth_user"> | Date | string
    chats?: ChatListRelationFilter
  }

  export type auth_userOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    last_login?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    chats?: chatOrderByRelationAggregateInput
  }

  export type auth_userWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: auth_userWhereInput | auth_userWhereInput[]
    OR?: auth_userWhereInput[]
    NOT?: auth_userWhereInput | auth_userWhereInput[]
    name?: StringFilter<"auth_user"> | string
    password?: StringFilter<"auth_user"> | string
    role?: EnumRoleFilter<"auth_user"> | $Enums.Role
    last_login?: DateTimeNullableFilter<"auth_user"> | Date | string | null
    created_at?: DateTimeFilter<"auth_user"> | Date | string
    updated_at?: DateTimeFilter<"auth_user"> | Date | string
    chats?: ChatListRelationFilter
  }, "id" | "email">

  export type auth_userOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    last_login?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: auth_userCountOrderByAggregateInput
    _avg?: auth_userAvgOrderByAggregateInput
    _max?: auth_userMaxOrderByAggregateInput
    _min?: auth_userMinOrderByAggregateInput
    _sum?: auth_userSumOrderByAggregateInput
  }

  export type auth_userScalarWhereWithAggregatesInput = {
    AND?: auth_userScalarWhereWithAggregatesInput | auth_userScalarWhereWithAggregatesInput[]
    OR?: auth_userScalarWhereWithAggregatesInput[]
    NOT?: auth_userScalarWhereWithAggregatesInput | auth_userScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"auth_user"> | number
    name?: StringWithAggregatesFilter<"auth_user"> | string
    email?: StringWithAggregatesFilter<"auth_user"> | string
    password?: StringWithAggregatesFilter<"auth_user"> | string
    role?: EnumRoleWithAggregatesFilter<"auth_user"> | $Enums.Role
    last_login?: DateTimeNullableWithAggregatesFilter<"auth_user"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"auth_user"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"auth_user"> | Date | string
  }

  export type chatWhereInput = {
    AND?: chatWhereInput | chatWhereInput[]
    OR?: chatWhereInput[]
    NOT?: chatWhereInput | chatWhereInput[]
    id?: IntFilter<"chat"> | number
    user_id?: IntFilter<"chat"> | number
    content?: StringFilter<"chat"> | string
    created_at?: DateTimeFilter<"chat"> | Date | string
    user?: XOR<Auth_userScalarRelationFilter, auth_userWhereInput>
  }

  export type chatOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    user?: auth_userOrderByWithRelationInput
  }

  export type chatWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: chatWhereInput | chatWhereInput[]
    OR?: chatWhereInput[]
    NOT?: chatWhereInput | chatWhereInput[]
    user_id?: IntFilter<"chat"> | number
    content?: StringFilter<"chat"> | string
    created_at?: DateTimeFilter<"chat"> | Date | string
    user?: XOR<Auth_userScalarRelationFilter, auth_userWhereInput>
  }, "id">

  export type chatOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    _count?: chatCountOrderByAggregateInput
    _avg?: chatAvgOrderByAggregateInput
    _max?: chatMaxOrderByAggregateInput
    _min?: chatMinOrderByAggregateInput
    _sum?: chatSumOrderByAggregateInput
  }

  export type chatScalarWhereWithAggregatesInput = {
    AND?: chatScalarWhereWithAggregatesInput | chatScalarWhereWithAggregatesInput[]
    OR?: chatScalarWhereWithAggregatesInput[]
    NOT?: chatScalarWhereWithAggregatesInput | chatScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"chat"> | number
    user_id?: IntWithAggregatesFilter<"chat"> | number
    content?: StringWithAggregatesFilter<"chat"> | string
    created_at?: DateTimeWithAggregatesFilter<"chat"> | Date | string
  }

  export type cctvWhereInput = {
    AND?: cctvWhereInput | cctvWhereInput[]
    OR?: cctvWhereInput[]
    NOT?: cctvWhereInput | cctvWhereInput[]
    id?: IntFilter<"cctv"> | number
    nama?: StringFilter<"cctv"> | string
    path_slug?: StringFilter<"cctv"> | string
    rtsp_url?: StringFilter<"cctv"> | string
    status?: BoolFilter<"cctv"> | boolean
    created_at?: DateTimeFilter<"cctv"> | Date | string
    updated_at?: DateTimeFilter<"cctv"> | Date | string
  }

  export type cctvOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    path_slug?: SortOrder
    rtsp_url?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type cctvWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: cctvWhereInput | cctvWhereInput[]
    OR?: cctvWhereInput[]
    NOT?: cctvWhereInput | cctvWhereInput[]
    nama?: StringFilter<"cctv"> | string
    path_slug?: StringFilter<"cctv"> | string
    rtsp_url?: StringFilter<"cctv"> | string
    status?: BoolFilter<"cctv"> | boolean
    created_at?: DateTimeFilter<"cctv"> | Date | string
    updated_at?: DateTimeFilter<"cctv"> | Date | string
  }, "id">

  export type cctvOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    path_slug?: SortOrder
    rtsp_url?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: cctvCountOrderByAggregateInput
    _avg?: cctvAvgOrderByAggregateInput
    _max?: cctvMaxOrderByAggregateInput
    _min?: cctvMinOrderByAggregateInput
    _sum?: cctvSumOrderByAggregateInput
  }

  export type cctvScalarWhereWithAggregatesInput = {
    AND?: cctvScalarWhereWithAggregatesInput | cctvScalarWhereWithAggregatesInput[]
    OR?: cctvScalarWhereWithAggregatesInput[]
    NOT?: cctvScalarWhereWithAggregatesInput | cctvScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"cctv"> | number
    nama?: StringWithAggregatesFilter<"cctv"> | string
    path_slug?: StringWithAggregatesFilter<"cctv"> | string
    rtsp_url?: StringWithAggregatesFilter<"cctv"> | string
    status?: BoolWithAggregatesFilter<"cctv"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"cctv"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"cctv"> | Date | string
  }

  export type auth_userCreateInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    chats?: chatCreateNestedManyWithoutUserInput
  }

  export type auth_userUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    chats?: chatUncheckedCreateNestedManyWithoutUserInput
  }

  export type auth_userUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: chatUpdateManyWithoutUserNestedInput
  }

  export type auth_userUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: chatUncheckedUpdateManyWithoutUserNestedInput
  }

  export type auth_userCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type auth_userUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auth_userUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatCreateInput = {
    content: string
    created_at?: Date | string
    user: auth_userCreateNestedOneWithoutChatsInput
  }

  export type chatUncheckedCreateInput = {
    id?: number
    user_id: number
    content: string
    created_at?: Date | string
  }

  export type chatUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: auth_userUpdateOneRequiredWithoutChatsNestedInput
  }

  export type chatUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatCreateManyInput = {
    id?: number
    user_id: number
    content: string
    created_at?: Date | string
  }

  export type chatUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cctvCreateInput = {
    nama: string
    path_slug: string
    rtsp_url: string
    status: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type cctvUncheckedCreateInput = {
    id?: number
    nama: string
    path_slug: string
    rtsp_url: string
    status: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type cctvUpdateInput = {
    nama?: StringFieldUpdateOperationsInput | string
    path_slug?: StringFieldUpdateOperationsInput | string
    rtsp_url?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cctvUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    path_slug?: StringFieldUpdateOperationsInput | string
    rtsp_url?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cctvCreateManyInput = {
    id?: number
    nama: string
    path_slug: string
    rtsp_url: string
    status: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type cctvUpdateManyMutationInput = {
    nama?: StringFieldUpdateOperationsInput | string
    path_slug?: StringFieldUpdateOperationsInput | string
    rtsp_url?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type cctvUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nama?: StringFieldUpdateOperationsInput | string
    path_slug?: StringFieldUpdateOperationsInput | string
    rtsp_url?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ChatListRelationFilter = {
    every?: chatWhereInput
    some?: chatWhereInput
    none?: chatWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type chatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type auth_userCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type auth_userAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type auth_userMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type auth_userMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type auth_userSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Auth_userScalarRelationFilter = {
    is?: auth_userWhereInput
    isNot?: auth_userWhereInput
  }

  export type chatCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type chatAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type chatMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type chatMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
  }

  export type chatSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type cctvCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    path_slug?: SortOrder
    rtsp_url?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type cctvAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type cctvMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    path_slug?: SortOrder
    rtsp_url?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type cctvMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    path_slug?: SortOrder
    rtsp_url?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type cctvSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type chatCreateNestedManyWithoutUserInput = {
    create?: XOR<chatCreateWithoutUserInput, chatUncheckedCreateWithoutUserInput> | chatCreateWithoutUserInput[] | chatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: chatCreateOrConnectWithoutUserInput | chatCreateOrConnectWithoutUserInput[]
    createMany?: chatCreateManyUserInputEnvelope
    connect?: chatWhereUniqueInput | chatWhereUniqueInput[]
  }

  export type chatUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<chatCreateWithoutUserInput, chatUncheckedCreateWithoutUserInput> | chatCreateWithoutUserInput[] | chatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: chatCreateOrConnectWithoutUserInput | chatCreateOrConnectWithoutUserInput[]
    createMany?: chatCreateManyUserInputEnvelope
    connect?: chatWhereUniqueInput | chatWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type chatUpdateManyWithoutUserNestedInput = {
    create?: XOR<chatCreateWithoutUserInput, chatUncheckedCreateWithoutUserInput> | chatCreateWithoutUserInput[] | chatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: chatCreateOrConnectWithoutUserInput | chatCreateOrConnectWithoutUserInput[]
    upsert?: chatUpsertWithWhereUniqueWithoutUserInput | chatUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: chatCreateManyUserInputEnvelope
    set?: chatWhereUniqueInput | chatWhereUniqueInput[]
    disconnect?: chatWhereUniqueInput | chatWhereUniqueInput[]
    delete?: chatWhereUniqueInput | chatWhereUniqueInput[]
    connect?: chatWhereUniqueInput | chatWhereUniqueInput[]
    update?: chatUpdateWithWhereUniqueWithoutUserInput | chatUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: chatUpdateManyWithWhereWithoutUserInput | chatUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: chatScalarWhereInput | chatScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type chatUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<chatCreateWithoutUserInput, chatUncheckedCreateWithoutUserInput> | chatCreateWithoutUserInput[] | chatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: chatCreateOrConnectWithoutUserInput | chatCreateOrConnectWithoutUserInput[]
    upsert?: chatUpsertWithWhereUniqueWithoutUserInput | chatUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: chatCreateManyUserInputEnvelope
    set?: chatWhereUniqueInput | chatWhereUniqueInput[]
    disconnect?: chatWhereUniqueInput | chatWhereUniqueInput[]
    delete?: chatWhereUniqueInput | chatWhereUniqueInput[]
    connect?: chatWhereUniqueInput | chatWhereUniqueInput[]
    update?: chatUpdateWithWhereUniqueWithoutUserInput | chatUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: chatUpdateManyWithWhereWithoutUserInput | chatUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: chatScalarWhereInput | chatScalarWhereInput[]
  }

  export type auth_userCreateNestedOneWithoutChatsInput = {
    create?: XOR<auth_userCreateWithoutChatsInput, auth_userUncheckedCreateWithoutChatsInput>
    connectOrCreate?: auth_userCreateOrConnectWithoutChatsInput
    connect?: auth_userWhereUniqueInput
  }

  export type auth_userUpdateOneRequiredWithoutChatsNestedInput = {
    create?: XOR<auth_userCreateWithoutChatsInput, auth_userUncheckedCreateWithoutChatsInput>
    connectOrCreate?: auth_userCreateOrConnectWithoutChatsInput
    upsert?: auth_userUpsertWithoutChatsInput
    connect?: auth_userWhereUniqueInput
    update?: XOR<XOR<auth_userUpdateToOneWithWhereWithoutChatsInput, auth_userUpdateWithoutChatsInput>, auth_userUncheckedUpdateWithoutChatsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type chatCreateWithoutUserInput = {
    content: string
    created_at?: Date | string
  }

  export type chatUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    created_at?: Date | string
  }

  export type chatCreateOrConnectWithoutUserInput = {
    where: chatWhereUniqueInput
    create: XOR<chatCreateWithoutUserInput, chatUncheckedCreateWithoutUserInput>
  }

  export type chatCreateManyUserInputEnvelope = {
    data: chatCreateManyUserInput | chatCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type chatUpsertWithWhereUniqueWithoutUserInput = {
    where: chatWhereUniqueInput
    update: XOR<chatUpdateWithoutUserInput, chatUncheckedUpdateWithoutUserInput>
    create: XOR<chatCreateWithoutUserInput, chatUncheckedCreateWithoutUserInput>
  }

  export type chatUpdateWithWhereUniqueWithoutUserInput = {
    where: chatWhereUniqueInput
    data: XOR<chatUpdateWithoutUserInput, chatUncheckedUpdateWithoutUserInput>
  }

  export type chatUpdateManyWithWhereWithoutUserInput = {
    where: chatScalarWhereInput
    data: XOR<chatUpdateManyMutationInput, chatUncheckedUpdateManyWithoutUserInput>
  }

  export type chatScalarWhereInput = {
    AND?: chatScalarWhereInput | chatScalarWhereInput[]
    OR?: chatScalarWhereInput[]
    NOT?: chatScalarWhereInput | chatScalarWhereInput[]
    id?: IntFilter<"chat"> | number
    user_id?: IntFilter<"chat"> | number
    content?: StringFilter<"chat"> | string
    created_at?: DateTimeFilter<"chat"> | Date | string
  }

  export type auth_userCreateWithoutChatsInput = {
    name: string
    email: string
    password: string
    role: $Enums.Role
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type auth_userUncheckedCreateWithoutChatsInput = {
    id?: number
    name: string
    email: string
    password: string
    role: $Enums.Role
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type auth_userCreateOrConnectWithoutChatsInput = {
    where: auth_userWhereUniqueInput
    create: XOR<auth_userCreateWithoutChatsInput, auth_userUncheckedCreateWithoutChatsInput>
  }

  export type auth_userUpsertWithoutChatsInput = {
    update: XOR<auth_userUpdateWithoutChatsInput, auth_userUncheckedUpdateWithoutChatsInput>
    create: XOR<auth_userCreateWithoutChatsInput, auth_userUncheckedCreateWithoutChatsInput>
    where?: auth_userWhereInput
  }

  export type auth_userUpdateToOneWithWhereWithoutChatsInput = {
    where?: auth_userWhereInput
    data: XOR<auth_userUpdateWithoutChatsInput, auth_userUncheckedUpdateWithoutChatsInput>
  }

  export type auth_userUpdateWithoutChatsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auth_userUncheckedUpdateWithoutChatsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatCreateManyUserInput = {
    id?: number
    content: string
    created_at?: Date | string
  }

  export type chatUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type chatUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}