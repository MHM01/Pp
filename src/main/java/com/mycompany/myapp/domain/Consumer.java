package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.domain.Persistable;

/**
 * A Consumer.
 */
@JsonIgnoreProperties(value = { "new" })
@Entity
@Table(name = "consumer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Consumer implements Serializable, Persistable<String> {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Transient
    private boolean isPersisted;

    @OneToMany(mappedBy = "id")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "id", "id" }, allowSetters = true)
    private Set<Subscriptionn> subscriptionns = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Consumer id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Consumer name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Transient
    @Override
    public boolean isNew() {
        return !this.isPersisted;
    }

    public Consumer setIsPersisted() {
        this.isPersisted = true;
        return this;
    }

    @PostLoad
    @PostPersist
    public void updateEntityState() {
        this.setIsPersisted();
    }

    public Set<Subscriptionn> getSubscriptionns() {
        return this.subscriptionns;
    }

    public void setSubscriptionns(Set<Subscriptionn> subscriptionns) {
        if (this.subscriptionns != null) {
            this.subscriptionns.forEach(i -> i.setId(null));
        }
        if (subscriptionns != null) {
            subscriptionns.forEach(i -> i.setId(this));
        }
        this.subscriptionns = subscriptionns;
    }

    public Consumer subscriptionns(Set<Subscriptionn> subscriptionns) {
        this.setSubscriptionns(subscriptionns);
        return this;
    }

    public Consumer addSubscriptionn(Subscriptionn subscriptionn) {
        this.subscriptionns.add(subscriptionn);
        subscriptionn.setId(this);
        return this;
    }

    public Consumer removeSubscriptionn(Subscriptionn subscriptionn) {
        this.subscriptionns.remove(subscriptionn);
        subscriptionn.setId(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Consumer)) {
            return false;
        }
        return id != null && id.equals(((Consumer) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Consumer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
