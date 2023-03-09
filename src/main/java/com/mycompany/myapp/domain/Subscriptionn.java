package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.domain.Persistable;

/**
 * A Subscriptionn.
 */
@JsonIgnoreProperties(value = { "new" })
@Entity
@Table(name = "subscriptionn")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Subscriptionn implements Serializable, Persistable<String> {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private String id;

    @Transient
    private boolean isPersisted;

    @OneToOne
    @JoinColumn(unique = true)
    @ManyToOne
    private Topic id;

    @OneToOne
    @JoinColumn(unique = true)
    @ManyToOne
    @JsonIgnoreProperties(value = { "subscriptionns" }, allowSetters = true)
    private Consumer id;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Subscriptionn id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Transient
    @Override
    public boolean isNew() {
        return !this.isPersisted;
    }

    public Subscriptionn setIsPersisted() {
        this.isPersisted = true;
        return this;
    }

    @PostLoad
    @PostPersist
    public void updateEntityState() {
        this.setIsPersisted();
    }

    public Topic getId() {
        return this.id;
    }

    public void setId(Topic topic) {
        this.id = topic;
    }

    public Subscriptionn id(Topic topic) {
        this.setId(topic);
        return this;
    }

    public Consumer getId() {
        return this.id;
    }

    public void setId(Consumer consumer) {
        this.id = consumer;
    }

    public Subscriptionn id(Consumer consumer) {
        this.setId(consumer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subscriptionn)) {
            return false;
        }
        return id != null && id.equals(((Subscriptionn) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Subscriptionn{" +
            "id=" + getId() +
            "}";
    }
}
