import "reflect-metadata";
import { Types } from './Types';
import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";
import { DateTimeProvider } from "../Services/DateTimeProvider";

const IoC = new Container();

IoC.bind(Types.IDateTimeProvider).to(DateTimeProvider).inTransientScope();

const LazyInject = getDecorators(IoC).lazyInject;

export { IoC, LazyInject };