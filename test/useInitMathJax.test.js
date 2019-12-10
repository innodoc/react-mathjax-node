it('should inject MathJax client-side', () => {
  expect(document.getElementById('__MATHJAX_SCRIPT__')).toBe(null)
  mount(<MathJaxComponent texCode="f(x)=x^2" />)
  expect(document.getElementById('__MATHJAX_SCRIPT__')).toBeInstanceOf(
    HTMLScriptElement
  )
})

it('should not inject MathJax server-side', () => {
  mount(<MathJaxComponent texCode="f(x)=x^2" />)
  expect(mockQueue).not.toBeCalled()
})

// can't really test internal callbacks but we make sure code path is taken
it('should remove MathJax onLoad callback on unmount', () => {
  mockSkipLoadScript = true // make sure MathJax is not loaded before unmount happens
  mount(<MathJaxComponent texCode="f(x)=x^2" />).unmount()
  expect(mockQueue).not.toBeCalled()
})
