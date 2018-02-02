// The window based api.
// Or real stream api, will automatically create internal buffer.

actor Stream
  be default(s) =>
    s match then
      case tupleOf(2) then
        s.filter(_.1 == 25)
         .window(5)
         .reduce(_.0 + _.0)
         .to(ref Collector)
      end
    end
  end
end