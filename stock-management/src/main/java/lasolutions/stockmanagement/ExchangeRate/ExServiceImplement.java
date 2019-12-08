package lasolutions.stockmanagement.ExchangeRate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("ExService")
public class ExServiceImplement implements ExService {

    @Autowired
    private ExRepository exRepository;

    @Override
    public String getExId() {
        return exRepository.getExId();
    }
}
