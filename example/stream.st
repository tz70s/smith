// Internal Pattern Matching

actor Stream
  be default(s) =>
    s match then
      case tupleOf(2) then
        s.filter(_.1 == 25)
         .to(ref Collector)
      end
      case tupleOf('anomaly', data) then
        data.to(ref AlertManager)
        be_(anomaly)
      end
      case _ then
        // ignore data.
      end
    end
  end

  be anomaly(s) => 
    s match then
      case tupleOf('recover', _) then
        tupleOf('recover', true).to(ref AlertManager)
        be_(default)
      end
    end
  end
end

// Case function?
