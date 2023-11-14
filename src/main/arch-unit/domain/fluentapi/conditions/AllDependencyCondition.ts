import { ArchCondition } from '@/arch-unit/domain/fluentapi/ArchCondition';
import { ConditionEvent } from '@/arch-unit/domain/fluentapi/ConditionEvent';
import { ConditionEvents } from '@/arch-unit/domain/fluentapi/ConditionEvents';
import { DescribedPredicate } from '@/arch-unit/domain/fluentapi/DescribedPredicate';
import { TypeScriptClass } from '@/arch-unit/domain/TypeScriptClass';

export class AllDependencyCondition extends ArchCondition<TypeScriptClass> {
  private readonly conditionPredicate: DescribedPredicate<TypeScriptClass>;

  constructor(description: string, conditionPredicate: DescribedPredicate<TypeScriptClass>) {
    super(description);
    this.conditionPredicate = conditionPredicate;
  }

  check(typeScriptClass: TypeScriptClass, events: ConditionEvents): void {
    typeScriptClass.dependencies.forEach(dependency =>
      events.add(
        new ConditionEvent(
          `Wrong dependency in ${typeScriptClass.path().get()}: ${dependency.path.get()}`,
          !this.conditionPredicate.test(new TypeScriptClass(dependency.typeScriptClass.name.get(), dependency.path.get(), []))
        )
      )
    );
  }
}
