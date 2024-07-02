const Component = () => (
    <Container>
      <Prompt
        when={isPrompt()}
        message={() => 'Are you sure you want to leave this page?'}
      />
      <h1>This is a component.</h1>
    </Container>
  )