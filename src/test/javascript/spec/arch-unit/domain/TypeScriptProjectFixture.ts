import { RelativePath } from '@/arch-unit/domain/RelativePath';
import { TypeScriptProject } from '@/arch-unit/domain/TypeScriptProject';

export class TypeScriptProjectFixture {
  static fakeSrc = (): TypeScriptProject => {
    return new TypeScriptProject(RelativePath.of('src/test/fake-src'));
  };
}
