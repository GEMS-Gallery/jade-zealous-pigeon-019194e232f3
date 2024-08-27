export const idlFactory = ({ IDL }) => {
  const BlogCreationStep = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Text,
    'prompt' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : BlogCreationStep, 'err' : IDL.Text });
  return IDL.Service({
    'getBlogCreationSteps' : IDL.Func(
        [],
        [IDL.Vec(BlogCreationStep)],
        ['query'],
      ),
    'updateBlogCreationStep' : IDL.Func(
        [IDL.Nat, BlogCreationStep],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
